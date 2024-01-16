import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["styles/app.component.scss"],
})
export class AppComponent {
  public form: FormGroup;

  constructor(protected formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      format: ["", [Validators.required]],
      turnoverPerDay: [false],
      turnoverPerWeek: [false],
      turnoverPerMonth: [false],
    });
  }

  public submit(buttonType: string): void {
    /**Параметры визита */
    const metrikaParams = this.getMetrikaParams(buttonType);

    // @ts-ignore
    ym(96113013, "params", metrikaParams);

    alert("Статистика успешно отправлена");
  }

  /**
   * Актуально
   * Метод возвращает актуальные параметры визита
   */
  private getMetrikaParams(buttonType: string): IMetrikaParams {
    let params: IMetrikaParams = {
      statements_format: this.form.value.format,
      statements_button: buttonType,
    };

    const turnovers = [];

    if (this.form.value.turnoverPerDay) {
      turnovers.push("turnoverPerDay");
    }

    if (this.form.value.turnoverPerWeek) {
      turnovers.push("turnoverPerWeek");
    }

    if (this.form.value.turnoverPerMonth) {
      turnovers.push("turnoverPerMonth");
    }

    if (turnovers.length) {
      params.statements_turnovers = turnovers;
    }

    return params;
  }

  /**
   * Неактуально
   * Метод отправляет статистику по выполненым целям
   */
  private sendMetrikaGoals(buttonType: string): void {
    // @ts-ignore
    ym(
      96113013,
      "reachGoal",
      "statements_" + buttonType,
      { statements_format: this.form.value.format },
      () => {
        alert("Статистика успешно отправлена");
      }
    );

    if (this.form.value.turnoverPerDay) {
      // @ts-ignore
      ym(96113013, "reachGoal", "statements_turnoverPerDay");
    }

    if (this.form.value.turnoverPerWeek) {
      // @ts-ignore
      ym(96113013, "reachGoal", "statements_turnoverPerWeek");
    }

    if (this.form.value.turnoverPerMonth) {
      // @ts-ignore
      ym(96113013, "reachGoal", "statements_turnoverPerMonth");
    }

    if (this.form.value.format) {
      // @ts-ignore
      ym(96113013, "reachGoal", "statements_format_" + this.form.value.format);
    }
  }
}

interface IMetrikaParams {
  statements_format: string;
  statements_button: string;
  statements_turnovers?: string[];
}
