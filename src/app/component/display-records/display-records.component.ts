import { Component, OnInit } from '@angular/core';
// import { DisplayRecordsService } from 'src/app/services/display-records.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute , Router} from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-records',
  templateUrl: './display-records.component.html',
  styleUrls: ['./display-records.component.css']
})
export class DisplayRecordsComponent implements OnInit {
  public res: any;
  public res1: any;
  public res2: any;

  p: Number = 1;
  count: Number = 10;
  BrandProductArray: Array<any> = [];
  BrandProductType: Array<any> = [];
  BrandProductArray1: Array<any> = [];
  allBrandProduct: Array<any> = [];
  uniqueArray: Array<any> = [];
  brandNameSelected: String;
  productTyeSelected: String;
  private index: any;
  obtainedProductType: Array<any> = [];
  obtainedProductTypeArray: any;
  obtainedProductType1Array: Array<any> = [];
  obtainedProductType1: any;
  obtainedModelNameArray: Array<any> = []
  obtainedModelName: any;
  obtainedModelNumberArray: Array<any> = []
  obtainedModelNumber: any;
  private routerparam: any;
  brandIndex: any;
  productChecked: any;
  checkedModelName: Array<any> = [];
  checkedModelNumber: Array<any> = [];
  uniqueArrayProduct: Array<any> = []
  obtainedProductTypeArrayNew: Array<any> = [];
  myForm: FormGroup;
  arrData: any;
  subscribedParam = "initial value";

  constructor(
    private _Activatedroute: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder,
    private httpService: HttpClient) {
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });

    this._Activatedroute.paramMap.subscribe(params => {
      this.subscribedParam = params.get("brandtype");
    });

    this.httpService.get('./assets/data/sampleData.json').subscribe(
      data => {
        this.arrData = data as string[];	 // FILL THE ARRAY WITH DATA.
        console.log(this.arrData);
        // For BrandName
        for (let i = 0; i < this.arrData.length; i += 1) {
          this.BrandProductArray.push(this.arrData[i].BrandName);
        }
        console.log(this.BrandProductArray);
        // BrandName ends here
        // For all dropdown list
        for (let i = 0; i < this.arrData.length; i += 1) {
          for (let j = 0; j < this.arrData[i].BrandProducts.length; j += 1) {
            this.allBrandProduct.push(this.arrData[i].BrandProducts[j].ProductType)
          }
        }
        // removeing dublicates
        // Loop through array values
        for (let i = 0; i < this.allBrandProduct.length; i++) {
          if (this.uniqueArray.indexOf(this.allBrandProduct[i]) === -1) {
            this.uniqueArray.push(this.allBrandProduct[i]);
          }
        }
        this.res1 = this.uniqueArray;
        console.log(this.res1)
        // Ends here
        this.res = this.arrData;

      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

    this.brandNameSelected;
    console.log(this.brandNameSelected);
    this.productTyeSelected;
  }
  onBrandSelect(event) {
    //selected branch producing product 
    console.log(this.brandNameSelected);
    for (let x = 0; x < this.res.length; x += 1) {
      if (this.res[x].BrandName === this.brandNameSelected) {
        this.index = x;
      }
    }
    this.obtainedProductType = [];
    for (let y = 0; y < this.res[this.index].BrandProducts.length; y += 1) {
      this.obtainedProductType.push(this.res[this.index].BrandProducts[y].ProductType)
    }
    this.obtainedProductTypeArray = this.obtainedProductType;
    console.log(this.obtainedProductTypeArray);
    // ends here
    for (let i = 0; i < this.obtainedProductTypeArray.length; i++) {
      if (this.uniqueArrayProduct.indexOf(this.obtainedProductTypeArray[i]) === -1) {
        this.uniqueArrayProduct.push(this.obtainedProductTypeArray[i]);
      }
    }
    this.obtainedProductTypeArrayNew = this.uniqueArrayProduct;
  }
  onProductSelect(event) {
    console.log(this.productTyeSelected);
    this.obtainedModelNameArray = [];
    this.obtainedModelNumberArray = [];
    for (let i = 0; i < this.res.length; i++) {
      if (this.res[i].BrandName === this.brandNameSelected) {
        this.brandIndex = i;
      }
    }
    for (let i = 0; i < this.res[this.brandIndex].BrandProducts.length; i++) {
      if (this.res[this.brandIndex].BrandProducts[i].ProductType === this.productTyeSelected) {
        this.obtainedModelNameArray.push(this.res[this.brandIndex].BrandProducts[i].ModelName);
        this.obtainedModelNumberArray.push(this.res[this.brandIndex].BrandProducts[i].ModelNumber)
      }
    }
    this.obtainedModelName = this.obtainedModelNameArray;
    this.obtainedModelNumber = this.obtainedModelNumberArray;
    console.log(this.obtainedModelName);
    this.router.navigate(["list",{ brandtype:this.brandNameSelected,productType:this.productTyeSelected}]);

  }
  // for checkbox datA
  onProductChecked(email, isChecked: boolean) {
    
    const emailFormArray = <FormArray>this.myForm.controls.useremail;
    emailFormArray.clear();
    if (isChecked) {
      emailFormArray.push(new FormControl(email));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
    }
    console.log(emailFormArray.value);
    const lastElement = emailFormArray.value;
    this.checkedModelName = [];
    this.checkedModelNumber = [];
    
    // console.log(event.target.check);
    for (let i = 0; i < this.res.length; i++) {
      for (let j = 0; j < this.res[i].BrandProducts.length; j++) {
        if (this.res[i].BrandProducts[j].ProductType === lastElement[0]) {
          this.checkedModelName.push(this.res[i].BrandProducts[j].ModelName)
          this.checkedModelNumber.push(this.res[i].BrandProducts[j].ModelNumber)
        }
      }
    }
    console.log(this.checkedModelName)
    console.log(this.checkedModelNumber);
    this.router.navigate(["list",{ productType:emailFormArray.value}]);
  }
}
