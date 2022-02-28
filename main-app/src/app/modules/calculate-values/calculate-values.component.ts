import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SystemTypeDictionary} from "../../dictionaries/system-type.dictionary";

@Component({
  selector: "app-calculate-values",
  templateUrl: "./calculate-values.component.html",
  styleUrls: ["./calculate-values.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalculateValuesComponent implements OnInit {
  systems = Array.from(SystemTypeDictionary.entries()).map(([key, value]) => {
    return {
      id: key,
      value,
    };
  });

  public selectedValue = this.systems[0].id;

  constructor(private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }

  public onContinueClicked(): void {
    this.router.navigate(["form"], { relativeTo: this.route, queryParams: { systemType: this.selectedValue } }).then();
  }
}
