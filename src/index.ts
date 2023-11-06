/*Generics
- ett sätt att skapa återanvändbarhet på datatyps nivå*/


/*Detta är INTE generic
- p.g.a. att:
- argumenten kan vara antingen string, number eller boolean
- returvärdet kan vara antingen string, number eller boolean

I en generic ska man egentligen kunna skicka in vad som helst, utan att funktionen definierar det.
Den ska bara definiera att den tar nått, gör något och skickar tillbaka något

Att argument kan vara string/number/boolean är ett sätt att begränsa*/
function demo22(arg:string | number | boolean):string | number | boolean {
    return "Hello World"
}

/*Det finns flera inbyggda generics i typescript*/

/*Exempel 1*/
const number: number[] = [];
const numbers: Array<number> = [];

/*Exempel 2*/
/*Vi får alltid tillbaka bastypen för html-element som är/ett element, 
som då kan vara element eller null */
// const inputVehicle = document.querySelector("#vehicleName")

//element har ej value, detta går ej
// console.log(inputVehicle.value)


/*"Du kan få tillbaka ett element, om vi hittar det elementet med det id:t.
Hittar vi ett element med det id:t, då får du tillbaka typen element, annars bull" */
const inputVehicle = document.querySelector("#vehicleName");


//Nu går det
/*Vad du får tillbaka är den RIKTIGA typen vi är ute efter - 
vi vill ha ett input element, eller null.

Om vi VET att vi har id:t i vår html-sida kan vi sätta !
*/

/*För vi musen över queryselector ser vi att den kan returnera ett 
HTML-element eller null. Om vi vet att den ej kommer ge null kan vi använda ! */
const inputVehicle1 = document.querySelector("#vehicleName")! as HTMLInputElement;

//För att slippa as
const inputVehicle2 = document.querySelector<HTMLInputElement>("#vehicleName")!;

// console.log(inputVehicle.value)

/*Superenkelt exempel - vart kan det vara bra att använda generic*/

/*3 funktioner som tar in exakt samma antal argument, returnerar samma typ som jag skickar in*/

function demoString(arg:string): string{
    return arg;
}

function demoNumber(arg:number): number{
    return arg;
}

function demoBoolean(arg:boolean): boolean{
    return arg;
}


const response1 = demoString("Hej");
const response2 = demoNumber(5);
const response3 = demoBoolean(true);

/*Exempel 2
Om vi vill göra om detta till en enda funktion.
Vår första simpla generic
- den kommer att ta in och hantera en typ
- den tar in argumentet för den typen jag definierar
- den kommer även returnera den typen*/

function demo2<T>(arg:T): T{
    return arg;
}

// const value1 = demo2<string>("Kalle");
// const value2 = demo2<number>(5);
// const value3 = demo2<boolean>(true);

/*Type inference 
- tolkar i sammanhanget att det är string/number/boolean*/

const value1 = demo2("Kalle");
const value2 = demo2(5);
const value3 = demo2(true);

/*Exempel 3
Lite krångligare - om vi måste skicka in flera argument till vår generic funktion*/

/*Ta in två argument och merge ihop de till ett object */
// function merge(x:any, y:any) {
//     return{...x, ...y}
// }

//x: object, y: object
// const result = merge({name: "Sofie"}, {lastName: "Tiainen"});
//{Sofie Tiainen}

// const result2 = merge({name: "Sofie"}, {lastName: "Tiainen"});
//{Sofie}
//göra destruction på numeriskt värde ger undefined


// function merge<T, U>(x: T, y: U) {
//     return{...x, ...y}
// }

/*Om vi vill säga att x och y måste vara objekt, då sätter vi ingen typ inom parantesen.
Istället sätter vi et innan parantesen, för inom parantesen har vi våra typ-parameter T och Y*/
//Type constraint

/*Det viktiga - har vi två argument sätter vi det inom <> argumenten.*/
function merge<T extends object, U extends object>(x: T, y: U) {
    return{...x, ...y}
}


//Försök 1
//ts kommer nu tolka detta, för muspekaren över merge
//men vad får vi tillbaka - en intersect av T och U - en sammanslagning av T och U
const merged1 = merge({name: "Volvo"}, {features: ["Navigator", "Heated backseat"]});

//Försök 2
//Vi får bara tillbaka Volvo.
//Den tar in 25 som ett object, gör en spread på den och det bli tomt object
// const merged2 = merge({name: "Volvo"}, 25);

/*Generics with interface
- vi begränsar det till en klass, interface eller type*/

interface Vehicle {
    name: string,
    numberOfGears: number,
}


interface Truck {
    name: string,
    numberOfGears: number,
    tara: number,
}


// function addVehicle<T>(vehicle: T): T {
//     return vehicle;
// }

function addVehicle<T extends Vehicle>(vehicle: T): T {
    //ex. anrop till mongo atlas DB
    //ex. anrop till MSSQL server
    return vehicle;
}

const addedVehicle = addVehicle<Vehicle>({name: "Volvo V90", numberOfGears: 6})

function createArray<T = string>(): T[] {
    return [];
}


const arr1 = createArray<string>();
const arr2 = createArray<number>();
const arr3 = createArray<Vehicle>();

//Anger vi inget får vi tillbaka en array med Vehicle
//Om det istället för vehicle stod string, 
//skulle vi få tillbaka en array med string/den defaultar till värdet string
const arr4 = createArray()


/*Function som tar typen som vi skickar in till argumentlistan
men också tar in vilken typ ska vi returnera*/

function getData<T extends string, R = Vehicle>(query: T): R[]{
    return [];
}

const vehicle = getData<string, Truck>("Select * from blabla");

/************************************************************************************* */

/*Generics with classes*/

/*Vi vill skapa en spellista som är filmer och musik*/

interface Movie {
    title: string;
    length: number;
}

interface Music {
    title: string;
    artist: string;
}

class MoviePlayList{
    public movies: Movie[] = []
}

class MusicPlayList{
    public list: Music[] = []
}

/*Skapar en generell class istället Playlist som är av en viss typ
Sedan skapar vi en lista, som är av typen T array, och sätter den
till en tom array

Sedan kan vi skriva följande
- vi talar om att det är Music vi vill stoppa in i den.
const musicList = new Playlist<Music>();
const movieList = new Playlist<Movie>();

Då behöver vi bara hantera Playlist klassen.

*/

class Playlist<T>{
    public list: T[] = [];
    public add(item: T) {
        this.list.push(item)
    }
}

const musicList = new Playlist<Music>();
const movieList = new Playlist<Movie>();

//Då vet den att det är musik vi vill lägga till
musicList.add

const arrowDemo = <T>(arg: T): T => {
    return arg;
}