# iOS Notes

|                           | Objective-C                       | Swift                                 |
| -                         |:-                                 |:-                                     | 
| typing                    | dynamic; use of `id` as any class | static                                |
| nil                       | ok with nil                       | must use optional type (`?`) with nil |
| mutable                   | mutable and immutable types       | any type is mutable                   |
| getters & setters         | automatic                         | automatic                             |
| method binding/resolution | happens at runtime (dynamic)      | happens at compile time               |
|                           |                                   |                                       |

## Objective-C
Header file (.h) contains class __interface__ (declaration).  
- public properties  
- `+` for class methods 
- `-` for instance methods 

Code file (.m) contains the class __implementation__.  
- method definitions 

## Swift
Optional types (`?` after type) wrap the base type and allow `nil` values.  

Conditional downcasts with `as?` return the optional value of the type being downcast to; should be used when unsure if downcast will succeed.  

Forcued downcasts with `as!` returns the result after downcasting and force-unwrapping; should be used when downcast is sure to succeed.   

## Quick Compare

### __Variable Declaration__ 
Objective-C
```obj-c
// generic 
type variableName = value;

// e.g.
NSString *myVar = @"hello";
```
Swift 
```swift
// generic 
var variableName: type = value

// e.g.
var myVar: String = "hello" 
```
### __Method Definition__
Both use a similar `label:parameterName` format.  

Objective-C
```obj-c
// generic 
-(returnType)methodName: (parameterType*)parameterName { body; }

// e.g.
-(returnType)initWithSomeProperty: (typeOfTheProperty*)theProperty { body; }

// with multiple parameters
- (returnType)methodName:(typeOfFirstParam*)firstParam labelForSecondParam:(typeOfSecondParam)secondParam { body; }
```
Swift
```swift
func methodName() { body }

// with multiple parameters
func methodName(firstParam:typeOfFirstParam, labelForSecondParam:typeOfSecondParam) { body }
```
### __Method Calling__ 
Objective-C  
```obj-c
[anObject instanceMethod];

// with multiple parameters
[anObject methodName:valueOfFirstParam labelForSecondParam:valueOfSecondParam];
```
Swift
```swift
anObject.instanceMethod()

// with multiple parameters
anObject.methodName(valueOfFirstParam, labelForSecondParam:valueOfSecondParam)
```
### __Class Definition__ 
Objective-C
```obj-c
// interface (.h)
@interface MyClass : NSObject
@end

// implementation (.m)
@implementation MyClass
@end
```
Swift
```swift
class MyClass { }
```
### __Instantiation__ 
Objective-C  
```obj-c
MyClass *myInstance = [[MyClass alloc] init];
MyClass *anotherInstance = [MyClass new];  
// note: `new` cannot be used with custom initializers
```
Swift
```swift
var myInstance = MyClass()
```