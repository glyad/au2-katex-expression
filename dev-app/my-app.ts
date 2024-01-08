
export class MyApp {

  public expression = 'f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi';

  public displayMode = true;

  public output = 'html';

  public throwOnError: boolean = true;

  public errorColor: string = '#cc0000';

  public leqno: boolean = false;

  public fleqn: boolean = false;

  public minRuleThickness = 0.04;

  public colorIsTextColor: boolean = false;

  public maxSize: number = 5;

  public maxExpand = 1000;

  public strict = 'warn';

  public trust: boolean = false;

  public globalGroup: boolean = false;

  public tex = `Systems of equations naturally appear in linear algebra through vector equations.`
}
