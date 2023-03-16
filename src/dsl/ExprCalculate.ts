import { ParserRuleContext } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree';
import { ExprLexer } from './parsers/ExprLexer';
import { ExprListener } from './parsers/ExprListener';
import { ExprContext } from './parsers/ExprParser';

export class ExprCalculate implements ExprListener {
  exprValueMap: Map<ExprContext, number>;
  /**
   *
   */
  constructor() {
    this.exprValueMap = new Map();
  }

  exitExpr(ctx: ExprContext) {
    const { children = [] } = ctx;
    const firstNode = children[0];
    if (firstNode && firstNode instanceof TerminalNode) {
      if (firstNode.symbol.type === ExprLexer.INT) {
        // int => value
        this.exprValueMap.set(ctx, parseInt(firstNode.text));
      }
    } else {
      if (children.length === 3) {
        const [expr1, op, expr2] = children as [ExprContext, TerminalNode, ExprContext];
        if (op instanceof TerminalNode) {
          switch (op.symbol.text) {
            case '*':
              this.exprValueMap.set(ctx, this.exprValueMap.get(expr1)! * this.exprValueMap.get(expr2)!);
              break;
            case '/':
              this.exprValueMap.set(ctx, this.exprValueMap.get(expr1)! / this.exprValueMap.get(expr2)!);
              break;
            case '+':
              this.exprValueMap.set(ctx, this.exprValueMap.get(expr1)! + this.exprValueMap.get(expr2)!);
              break;
            case '-':
              this.exprValueMap.set(ctx, this.exprValueMap.get(expr1)! - this.exprValueMap.get(expr2)!);
              break;
            default:
              break;
          }
        }
      } else {
      }
    }
    console.log(ctx.toStringTree());
  }

  exitEveryRule: undefined;
}
