Decorator for portation of haskell typeclass ORD
================================================

The Ord Interface defines ordering in [typescript](https://www.typescriptlang.org/).
The decorator implements the Ordering-Interface.
On the other hand it is a library for funtions.
Mainly Lists of this interface are used.

There is an es5-translation in the dist-directory.
[tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) was used for transpiling.

As an addition there is a record-library to calculate some values by lists of IOrds.
But it's experimental.

## Installation

  npm install decorator-ord --save

## Usage
### Decorator
```javascript
  type TColor = "yellow" | "red";
  const carConfig = new OrdConfig();
  
  @Ord.implement({
      config: carConfig
  })
  class Car implements IEq {
    @Ord.field({
        ordinality: 2,
        dir:'DESC'
    })
    private age:number;
 
    @Ord.field({
        ordinality: 1,
        map: ['yellow','red']
    })
    private color:TColor;
    
    constructor(age:number, color:TColor){
        this.age=age;
        this.color=color;
    }
    
    //this is neccessary to ensure the interface
    greater:(a:IOrd)=>boolean;
    less:(a:IOrd)=>boolean;
    eq:(a:IEq)=>boolean;
    neq:(a:IEq)=>boolean;
  }
```
Notice the Configuration-Object.
Objects of car can now be ordered by color and than by age. 
Be aware that the properties can be any type 
that support "<",">", are mapped or have IEq implemented.

### Using the EQ-Library
#### sort(cs:IOrd[], config:IOrdConfig):IOrd[]
```javascript
  sort(listOfCars, carConfig) //sorts listOfCars by carConfig
```
 
#### greater(cs:IOrd[], ref:IOrd, config:IOrdConfig):IOrd[]
```javascript
  greater(listOfCars, new Car(null, 10), carConfig) //reveals all cars older than 10 years 
  greater(listOfCars, new Car('red', 10), carConfig) //reveals all red cars older than 10 years 
```
 
#### less(cs:IOrd[], ref:IOrd, config:IOrdConfig):IOrd[]
```javascript
  less(listOfCars, new Car('red',null), carConfig) //reveals all yellow cars 
  less(listOfCars, new Car('red',5), carConfig) //reveals all yellow cars younger than 5 
```
 
### Using EqConfig
#### clone():OrdConfig 
```javascript
  let copyOfConfig = carConfig.clone(); 
```

#### ordFields:Array<IOrdField>
```javascript
  let newFields:Array<IOrdField> = [];
  copyOfFields.ordFields.foreach((val, key) => if(key%2) newFields.push(val));
  copyOfFields.ordFields = newFields;
```

#### eqFields:Array<EqField>
```javascript
  let newFields:Array<EqField> = [];
  copyOfFields.eqFields.foreach((val, key) => if(key%2) newFields.push(val));
  copyOfFields.eqFields = newFields;
```
 
#### setOrdnialityOfField(name:string, fields:Array<IField>, newIndex = 0)
```javascript
  let configCopy = carConfig.clone();
  configCopy.setOrdnialityOfField('age', configCopy.ordFields, 0);
  sort(listOfCars, configCopy) //Sorts cars with priority age
```

### Using OrdAnd
#### fuzzyEq(cs:IEq[], refs:IEq[], config:IEqConfig):IEq[]
```javascript
  @OrdAnd.implement({})
  export class CarAnd extends Car {
  }
  
  inRange(listOfCars, new CarAnd(10,'red'), new CarAnd(2,'yellow') 
  //reveals all red and yellow cars between 2 and 10 years.
  //all non-null properties must be fullfilled
```

### _Recorder_
It's an experimental technique to extract field-information of lists of Ords.
The role model is a recorder. The use is still a bit unclear to me.
There are

*  CountRecord - _frequency of values_
*  BorderRecord - _calculates min and max of values_

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
* 0.1.1 decorator-eq as dependency
* 0.1.2 better transpiling in dist/index.js used
* 0.1.3 split config fields