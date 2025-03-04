export type TokenType = '(' | ')' | '[' | ']' | '{' | '}' | '|' | '&' | '<' | '>' | ';' | ',' | '*' | '?' | '!' | '=' | ':' | '.' | '@' | '#' | '~' | '/' | '=>' | '...' | 'null' | 'undefined' | 'function' | 'this' | 'new' | 'module' | 'event' | 'external' | 'typeof' | 'keyof' | 'readonly' | 'import' | 'is' | 'in' | 'asserts' | 'Identifier' | 'StringValue' | 'Number' | 'EOF';
export interface Token {
    type: TokenType;
    text: string;
    startOfLine: boolean;
}
