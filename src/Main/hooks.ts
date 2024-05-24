import { useEffect, useState } from "react"
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { useRef } from "react"
import TileLayer from "ol/layer/Tile";
import { TileArcGISRest } from "ol/source";
import { Vector } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorSource from 'ol/source/Vector.js'
import apply from 'ol-mapbox-style';
import { fromLonLat } from "ol/proj";
import { OverlayProps } from "./components/Overlay";
import { Feature, MapBrowserEvent, Overlay } from "ol";
import { LineString, Point, Polygon } from "ol/geom";

export const useOpenLayers = () => {
  const apiKey = "AAPKd1728145036b47cba99cd60f965fa609TaclhKW1y26Fno0gM90Gct254QnK4haVrU40xPikFpJILxfI71k-ultZlhgV2pQR"
  const basemapId = "arcgis/streets";
  const basemapURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapId}?token=${apiKey}`;
  const trailsLayerUrl = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0" + "/query?where=1%3D1&outFields=*&returnGeometry=true&f=pgeojson"
  const parksLayerUrl = "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0" + "/query?where=1%3D1&outFields=*&returnGeometry=true&f=pgeojson"
  let addPoint
  let addLine
  let addPolygon
  const mapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [olMap, setOlMap] = useState<Map>()
  const [selectedAcre, setSelectedAcre] = useState<OverlayProps>()
  useEffect(() => {
    const map = new Map({
      view: new View({
        center: fromLonLat([-118.805, 34.027]),
          zoom: 12
      }),
      target: mapRef.current as HTMLElement
    })

    apply(map, basemapURL).then((map: Map) => {
      const trailLayer = new Vector({
        source: new VectorSource({
          format: new GeoJSON(),
          url: trailsLayerUrl
        }),
        visible: true,
        zIndex: 10000,
      });

      const parkLayer = new Vector({
        source: new VectorSource({
          format: new GeoJSON(),
          url: parksLayerUrl
        }),
        visible: true,
        zIndex: 10000,
      });

      map.addLayer(trailLayer);
      map.addLayer(parkLayer)
    })

    const overlay = new Overlay({
      element: overlayRef.current as HTMLElement,
      positioning: 'bottom-left',
      id: 'overlay',
      autoPan: true,
      offset: [12, 0]
  })
    map.addOverlay(overlay)

    const onClickHandler = (event: MapBrowserEvent<any>) => {
      overlay.setPosition(undefined)
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const properties = feature.getProperties()
        console.log(properties)
        if (Object.keys(properties).includes("RPT_ACRES")) {
          setSelectedAcre({
            acreDistance: properties["RPT_ACRES"],
            acreName: properties["PARK_NAME"]
          })
        }
        overlay.setPosition(event.coordinate)
      })
    }

    map.on("click", onClickHandler)

    setOlMap(map)
    return () => map.setTarget(undefined)
    }, [])


    useEffect(() => {
      if (olMap) {
        const vectorSource = new VectorSource();
        const vectorLayer = new Vector({
          source: vectorSource,
        });
        olMap!.addLayer(vectorLayer);
    
        const addFeature = (geometry: any) => {
          const feature = new Feature({
            geometry: geometry,
          });
          vectorSource.addFeature(feature);
        };
    
        addPoint = () => {
          const x = Math.random() * 360 - 180;
          const y = Math.random() * 180 - 90;
          const point = new Point([x, y]);
          addFeature(point);
        };
    
        addLine = () => {
          const coordinates = [];
          for (let i = 0; i < 2; i++) {
            const x = Math.random() * 360 - 180;
            const y = Math.random() * 180 - 90;
            coordinates.push([x, y]);
          }
          const line = new LineString(coordinates);
          addFeature(line);
        };
    
        addPolygon = () => {
          const coordinates = [];
          for (let i = 0; i < 3; i++) {
            const x = Math.random() * 360 - 180;
            const y = Math.random() * 180 - 90;
            coordinates.push([x, y]);
          }
          coordinates.push(coordinates[0]); // Close the polygon
          const polygon = new Polygon([coordinates]);
          addFeature(polygon);
        };
      }
    }, [olMap])
 

  return {mapRef, olMap, selectedAcre, overlayRef, addPoint, addLine, addPolygon}
}