export interface Iplaces {
    formatted_address: String 
    geometry:  Geometry
    name: String
    opening_hours: OpeningHours
    telefono: String[]

}
interface Location{
    lat: Number;
    lng: Number;
    a: Number;
    y: Number;
    h: Number;
    t: Number;
}

interface Viewport{
    northeast: Location;
    southwest: Location;
}

interface Geometry{
    location: Location;
    viewport: Viewport;
}

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
type OpeningHours = Record<Day, boolean>;