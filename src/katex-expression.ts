/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { bindable } from 'aurelia';
import { watch } from '@aurelia/runtime-html';
import katex from 'katex';

export interface IKatexOptions {
    displayMode?: boolean;
    output?: "html" | "mathml" | "htmlAndMathml";
    leqno?: boolean;
    fleqn?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: IMacrosDictionary;
    minRuleThickness?: number;
    colorIsTextColor?: boolean;
    maxSize?: number;
    maxExpand?: number;
    strict?: string | boolean | Function;
    trust?: boolean;
    globalGroup?: boolean;
}

export interface IMacrosDictionary {
    [key: string]: any;
}

export class KatexExpression {

  private katexElement: Element;
  private _options: IKatexOptions = {
    displayMode: false,
    output: "html",
    leqno: false,
    fleqn: false,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: {},
    minRuleThickness: 0.04,
    colorIsTextColor: false,
    maxSize: 5,
    maxExpand: 1000,
    strict: "warn",
    trust: false,
    globalGroup: false
  };

  @bindable public expression: string;

  @bindable
  public get displayMode(): boolean {
    return this._options.displayMode;
  }
  public set displayMode(value: boolean) {
    this._options.displayMode = value;
  }

  @bindable
  public get output() {
    return this._options.output;
  }
  public set output(value) {
    this._options.output = value;
  }

  @bindable
  public get leqno() {
    return this._options.leqno;
  }
  public set leqno(value) {
    this._options.leqno = value;
  }

  @bindable
  public get fleqn() {
    return this._options.fleqn;
  }
  public set fleqn(value) {
    this._options.fleqn = value;
  }

  @bindable
  public get throwOnError() {
    return this._options.throwOnError;
  }
  public set throwOnError(value) {
    this._options.throwOnError = value;
  }

  @bindable
  public get errorColor() {
    return this._options.errorColor;
  }
  public set errorColor(value) {
    this._options.errorColor = value;
  }

  @bindable
  public get macros() {
    return this._options.macros;
  }
  public set macros(value: IMacrosDictionary) {
    this._options.macros = value;
  }

  @bindable
  public get minRuleThickness() {
    return this._options.minRuleThickness;
  }
  public set minRuleThickness(value) {
    this._options.minRuleThickness = value;
  }

  @bindable
  public get colorIsTextColor() {
    return this._options.colorIsTextColor;
  }
  public set colorIsTextColor(value) {
    this._options.colorIsTextColor = value;
  }

  @bindable
  public get maxSize() {
    return this._options.maxSize;
  }
  public set maxSize(value) {
    this._options.maxSize = value;
  }

  @bindable
  public get maxExpand() {
    return this._options.maxExpand;
  }
  public set maxExpand(value) {
    this._options.maxExpand = value;
  }

  @bindable
  public get strict() {
    return this._options.strict;
  }
  public set strict(value) {
      this._options.strict = value;
  }

  @bindable
  public get trust() {
    return this._options.trust;
  }
  public set trust(value) {
    this._options.trust = value;
  }

  @bindable
  public get globalGroup() {
    return this._options.globalGroup;
  }
  public set globalGroup(value) {
    this._options.globalGroup = value;
  }
  
  protected attached() {
    this.renderExpression();
  }

  @watch(KatexExpression => KatexExpression.expression)
  @watch(KatexExpression => KatexExpression.displayMode)
  @watch(KatexExpression => KatexExpression.errorColor)
  @watch(KatexExpression => KatexExpression.fleqn)
  @watch(KatexExpression => KatexExpression.leqno)
  @watch(KatexExpression => KatexExpression.macros)
  @watch(KatexExpression => KatexExpression.maxExpand)
  @watch(KatexExpression => KatexExpression.maxSize)
  @watch(KatexExpression => KatexExpression.minRuleThickness)
  @watch(KatexExpression => KatexExpression.output)
  @watch(KatexExpression => KatexExpression.strict)
  @watch(KatexExpression => KatexExpression.throwOnError)
  @watch(KatexExpression => KatexExpression.trust)
  @watch(KatexExpression => KatexExpression.globalGroup)
  private renderExpression() {
    if (this.expression && this.katexElement) {
      try {
        katex.render(this.expression, this.katexElement, this._options);
        //console.log(katex.renderToString(this.expression, this._options));
      } catch (err) {
        console.error('Error rendering KaTeX expression', err);
      }
    }
  }
}
