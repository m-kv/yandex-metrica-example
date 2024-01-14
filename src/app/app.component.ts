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
    console.log("this.form: ", this.form);

    // @ts-ignore
    ym(96113013, "reachGoal", "statements_" + buttonType, undefined, () => {
      alert("Статистика успешно отправлена");
    });

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
