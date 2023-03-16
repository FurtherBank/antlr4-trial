import React, { ChangeEvent, useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ExprLexer } from './dsl/parsers/ExprLexer';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree';
import { ExprParser } from './dsl/parsers/ExprParser';
import { ExprCalculate } from './dsl/ExprCalculate';

function App() {
  const [text, setText] = useState('10*20+30');

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    [setText]
  );

  return (
    <div className="App">
      <textarea name="" id="" cols={30} rows={10} onChange={changeHandler}>
        {text}
      </textarea>
      <button
        onClick={() => {
          const input = CharStreams.fromString(text);
          const lexer = new ExprLexer(input);
          const tokens = new CommonTokenStream(lexer);
          const parser = new ExprParser(tokens);
          const tree = parser.expr();
          // 拿 token
          console.log(tokens.getTokens());
          // 拿 tree
          console.log(tree);
          console.log(tree.toStringTree());
          // listener
          const listener = new ExprCalculate();
          const walker = new ParseTreeWalker();
          walker.walk(listener, tree);
          console.log(listener.exprValueMap);
        }}
      >
        click me
      </button>
    </div>
  );
}

export default App;
