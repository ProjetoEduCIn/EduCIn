// Configurações globais para os testes
import '@testing-library/jest-dom';

// Mock do TextEncoder necessário para testes com JWT 
class TextEncoderMock {
  encode(str) {
    return new Uint8Array([...str].map(c => c.charCodeAt(0)));
  }
}

class TextDecoderMock {
  decode(arr) {
    return String.fromCharCode(...arr);
  }
}

global.TextEncoder = TextEncoderMock;
global.TextDecoder = TextDecoderMock;