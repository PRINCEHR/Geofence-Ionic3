import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
//import * as Leaflet from "leaflet";
import { GeofenceService } from "../../services/geofence-service";

declare var google;
declare var circle;
declare var marker;


@Component({
  templateUrl: "geofence-details.html"
})
export class GeofenceDetailsPage {
  private geofence: Geofence;
  private _radius: number;
  private _latLng: any;
  private notificationText: string;
  private transitionType: string;
  private circle: any;
  private marker: any;
  private map: any;

  constructor(
    private nav: NavController,
    navParams: NavParams,
    private geofenceService: GeofenceService,
    private menu: MenuController,



  ) {
    this.geofenceService = geofenceService;
    this.geofence = navParams.get("geofence");
    this.transitionType = this.geofence.transitionType.toString();
    this.notificationText = this.geofence.notification.text;
    this._radius = this.geofence.radius;
    console.log(this.geofence.latitude + ',' + this.geofence.longitude)
    // this._latLng = Leaflet.latLng(this.geofence.latitude, this.geofence.longitude);
    this._latLng = new google.maps.LatLng(this.geofence.latitude, this.geofence.longitude);

  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
    this.circle.setRadius(value);
  }

  set latLng(value) {
    this._latLng = value;
    //  this.circle.setLatLng(value);
    //  this.marker.setLatLng(value);
  }

  get latLng() {
    return this._latLng;
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    // workaround map is not correctly displayed
    // maybe this should be done in some other event
    setTimeout(this.loadMap.bind(this), 100);
  }

  loadMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: this._latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    this.circle = new google.maps.Circle({
      center: this.latLng,
      map: this.map,
      radius: this.radius,
      strokeColor: "red",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "red",
      clickable: true,
    });
    this.circle.bindTo('center', this.marker, 'position');
    google.maps.event.addListener(this.marker, 'dragend', (event) => {
      this.latLng = event.latLng;
    });


    // This event listener calls addMarker() when the circle is clicked.
    google.maps.event.addListener(this.circle, 'click', (e) => {
      this.markerPosition(e);
    })

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(this.map, 'click', (e) => {
      this.markerPosition(e);
    });

  }
  //Changing marker along with circle
  markerPosition(e) {
    //removes previous flotted markers
    if (this.marker != null) {
      this.marker.setMap(null);
      this.marker = null;
    }
    //Set every time as center
    this.map.setCenter(e.latLng);
    this.latLng = e.latLng;
    this.marker = new google.maps.Marker({
      map: this.map,
      center: e.latLng,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    this.circle.bindTo('center', this.marker, 'position');

  }
  //Saving changes 
  saveChanges() {
    const geofence = this.geofence;
    geofence.notification.text = this.notificationText;
    geofence.radius = this.radius;
    geofence.latitude = this.latLng.lat();
    geofence.longitude = this.latLng.lng();
    geofence.transitionType = parseInt(this.transitionType, 10);
    this.geofenceService.addOrUpdate(geofence).then(() => {
      this.nav.pop();
    });
  }
}
