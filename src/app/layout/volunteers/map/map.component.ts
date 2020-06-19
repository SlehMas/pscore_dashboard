import { Component, OnInit } from '@angular/core';
import { VolunteersService } from 'src/app/services/volunteers.service';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  volunteers: any[] = [];
  map: any;

  constructor
    (private volunteerService: VolunteersService) {

  }

  createMarkerIcon(lon, lat, status) {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });


    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: status ? 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Azure-icon.png' :
          'http://icons.iconarchive.com/icons/paomedia/small-n-flat/32/map-marker-icon.png'
      }))
    });

    iconFeature.setStyle(iconStyle);

    return iconFeature;
  }
  createMarkers(posArray) {

    const vectorSource = new ol.source.Vector({
      features: [
        ...posArray.map(p => this.createMarkerIcon(p.lon, p.lat, p.active)),
      ]
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    return vectorLayer;
  }

  ngOnInit() {
    this.volunteerService.getVolunteers().subscribe(data => {
      const vMarkers = [];
      this.volunteers = data;

      // create voluntees marker
      this.volunteers.forEach(v => vMarkers.push({
          lat: v.latitude,
          lon: v.longitude,
          active: v.status === 'active'
        })
      );
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([73.8567, 18.5204]),
          zoom: 2
        }),
      });

      this.map.addLayer(this.createMarkers(vMarkers));
    });
  }

  showVolunteer (lon, lat) {
    const coordMin = ol.proj.fromLonLat([lon, lat], 'EPSG:3857');
    const coordMax = ol.proj.fromLonLat([lon, lat], 'EPSG:3857');
    const extent = [coordMin[0], coordMin[1], coordMax[0], coordMax[1]];

    this.map.getView().fit(extent);
    this.map.getView().setZoom(this.map.getView().getZoom() - 22);
    return false;
  }
}
