import {
  StreamingCallbackHttpResponse,
  StreamingStrategy,
  Token,
} from '../declarations/canister_http_interface.did';
import { streamingCallbackHttpResponseType } from '../declarations';
import { IDL } from '@dfinity/candid';
import {
  HttpAgent,
  type QueryResponse,
  concat,
} from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';

const MAX_CALLBACKS = 1000;

export async function streamContent(
  agent: HttpAgent,
  canisterId: Principal,
  streamingStrategy: StreamingStrategy
): Promise<ArrayBuffer> {
  let buffer = new ArrayBuffer(0);
  let tokenOpt = [streamingStrategy.Callback.token];
  const [, callBackFunc] = streamingStrategy.Callback.callback;

  let currentCallback = 1;
  while (tokenOpt.length !== 0) {
    if (currentCallback > MAX_CALLBACKS) {
      throw new Error('Exceeded streaming callback limit');
    }
    const callbackResponse = await queryNextChunk(
      tokenOpt[0],
      agent,
      canisterId,
      callBackFunc
    );
    switch (callbackResponse.status) {
      case "replied": {
        const callbackData = IDL.decode(
          [streamingCallbackHttpResponseType],
          callbackResponse.reply.arg
        )[0];
        if (isStreamingCallbackResponse(callbackData)) {
          buffer = concat(buffer, callbackData.body);
          tokenOpt = callbackData.token;
        } else {
          throw new Error('Unexpected callback response: ' + callbackData);
        }
        break;
      }
      case "rejected": {
        throw new Error('Streaming callback error: ' + callbackResponse);
      }
    }
    currentCallback += 1;
  }
  return buffer;
}

function queryNextChunk(
  token: Token,
  agent: HttpAgent,
  canisterId: Principal,
  callBackFunc: string
): Promise<QueryResponse> {
  const tokenType = token.type();
  // unbox primitive values
  const tokenValue =
    typeof token.valueOf === 'function' ? token.valueOf() : token;
  const callbackArg = IDL.encode([tokenType], [tokenValue]);
  return agent.query(canisterId, {
    methodName: callBackFunc,
    arg: callbackArg,
  });
}

function isStreamingCallbackResponse(
  response: unknown
): response is StreamingCallbackHttpResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'body' in response &&
    'token' in response
  );
}
