import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }
  users = [];
  ngOnInit() {
    this.http.get('http://test-demo.aem-enersol.com/api/dashboard').toPromise().then((res)=>{
      //push users to an array to be displayed
    for(var i = 0; i < res['tableUsers'].length; i++){
      this.users.push(res['tableUsers'][i]);
    }

    //call functions to generate charts
    this.createDonut(res['chartDonut']);
    this.createBar(res['chartBar']);

    }).catch((err)=>{
      console.log(err);
    })
  }


//create barchart
createBar(data){
    let chart = am4core.create("barDiv", am4charts.XYChart);
    chart.data = data;
// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;

categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
  if (target.dataItem && target.dataItem.index & 1) {
    return dy + 25;
  }
  return dy;
});

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
let series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "value";
series.dataFields.categoryX = "name";
series.name = "value";
series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

let columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
  }

  //create donut chart 
  createDonut(data){
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.data = data;
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "name";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;
    
    let rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;
  }

//to logout
  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
