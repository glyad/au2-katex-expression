/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { bindable } from 'aurelia';
import { watch } from '@aurelia/runtime-html';
import katex from 'katex';

type Output = "html" | "mathml" | "htmlAndMathml";

export interface IKatexOptions {
    displayMode?: boolean;
    output?: Output;
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
  /**
   * Render math in display mode, which puts the math in " +
            "display style (so \\int and \\sum are large, for example), and " +
            "centers the math on the page on its own line.
   * 
   * @returns {boolean} The display mode value.
   */
  public get displayMode(): boolean {
    return this._options.displayMode;
  }
  public set displayMode(value: boolean | string) {
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }
    this._options.displayMode = <boolean>value;
  }

  @bindable
  /**
   * Gets the output value. 
   * Determines the markup language of the output.
   * 
   * @returns The output value.
   */
  public get output() {
    return this._options.output;
  }
  public set output(value) {
    this._options.output = value;
  }

  @bindable
  /**
   * Gets the value of the leqno property.
   * Render display math in leqno style (left-justified tags).
   * 
   * @returns The value of the leqno property.
   */
  public get leqno() {
    return this._options.leqno;
  }
  public set leqno(value) {
    this._options.leqno = value;
  }

  @bindable
  /**
   * Gets the value of the fleqn option.
   * Render display math flush left.
   * 
   * @returns The value of the fleqn option.
   */
  public get fleqn() {
    return this._options.fleqn;
  }
  public set fleqn(value) {
    this._options.fleqn = value;
  }

  @bindable
  /**
   * Gets the value of the throwOnError option.
   * Render errors (in the color given by --error-color) instead of 
   * throwing a ParseError exception when encountering an error.
   * 
   * @returns {boolean} The value of the throwOnError option.
   */
  public get throwOnError() {
    return this._options.throwOnError;
  }
  public set throwOnError(value) {
    this._options.throwOnError = value;
  }

  @bindable
  /**
   * Gets the error color.
   * A color string given in the format 'rgb' or 'rrggbb' (no #).
   * 
   * @returns The error color.
   */
  public get errorColor() {
    return this._options.errorColor;
  }
  public set errorColor(value) {
    this._options.errorColor = value;
  }

  @bindable
  /**
   * Gets the macros for the Katex expression.
   * Define custom macro of the form '\\foo:expansion'.
   * 
   * @returns The macros object.
   */
  public get macros() {
    return this._options.macros;
  }
  public set macros(value: IMacrosDictionary) {
    this._options.macros = value;
  }

  @bindable
  /**
   * Gets the minimum rule thickness.
   * Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, 
   * `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, 
   * and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.
   * 
   * @returns The minimum rule thickness.
   */
  public get minRuleThickness() {
    return this._options.minRuleThickness;
  }
  public set minRuleThickness(value) {
    this._options.minRuleThickness = value;
  }

  @bindable
  /**
   * Gets the value indicating whether the color is used as the text color.
   * 
   * @returns {boolean} The value indicating whether the color is used as the text color.
   */
  public get colorIsTextColor() {
    return this._options.colorIsTextColor;
  }
  public set colorIsTextColor(value) {
    this._options.colorIsTextColor = value;
  }

  @bindable
  /**
   * Gets the maximum size of the expression.
   * @returns The maximum size.
   */
  public get maxSize() {
    return this._options.maxSize;
  }
  public set maxSize(value) {
    this._options.maxSize = value;
  }

  @bindable
  /**
   * Gets the maximum expansion value.
   * Limit the number of macro expansions to the specified number, to prevent 
   * e.g. infinite macro loops. If set to Infinity, the macro expander 
   * will try to fully expand as in LaTeX.
   * 
   * @returns The maximum expansion value.
   */
  public get maxExpand() {
    return this._options.maxExpand;
  }
  public set maxExpand(value) {
    this._options.maxExpand = value;
  }

  @bindable
  /**
   * Gets the value of the strict option.
   * Turn on strict / LaTeX faithfulness mode, which throws an error, 
   * if the input uses features that are not supported by LaTeX.
   * 
   * @returns {boolean} The value of the strict option.
   */
  public get strict() {
    return this._options.strict;
  }
  public set strict(value) {
      this._options.strict = value;
  }

  @bindable
  /**
   * Gets the trust level of the expression.
   * Trust the input, enabling all HTML features such as \\url.
   * 
   * @returns The trust level.
   */
  public get trust() {
    return this._options.trust;
  }
  public set trust(value) {
    this._options.trust = value;
  }

  @bindable
  /**
   * Gets the global group value. If non-zero, all user-specified sizes, e.g. in 
   * \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and 
   * spaces can be arbitrarily large.
   * 
   * @returns The global group value.
   */
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
