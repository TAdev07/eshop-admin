import { AimOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import {
  Marker,
  TileLayer,
  MapContainer as Wrapper,
  useMap,
  useMapEvents,
} from 'react-leaflet';
// import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
import { useDebounceEffect } from 'ahooks';
import L from 'leaflet';
import MarkerIcon from 'sensor/images/marker-icon.png';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

function LocationMarker({ position: pos, defaulLocal, onChange }) {
  const [position, setPosition] = useState(null);
  const markerRef = useRef(null);

  const map = useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
    locationfound(e) {
      onChange(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       map.flyTo({ lat: latitude, lng: longitude }, map.getZoom(), {
  //         duration: 2,
  //       });
  //     });
  //   }
  // }, []);
  useDebounceEffect(
    () => {
      if (defaulLocal) {
        setPosition(defaulLocal);
        map.flyTo(defaulLocal, map.getZoom(), { duration: 2 });
      }
    },
    [defaulLocal],
    {
      wait: 500,
    },
  );
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onChange(marker.getLatLng());
        }
      },
    }),
    [],
  );

  const positionClass =
    (pos && POSITION_CLASSES[pos]) || POSITION_CLASSES.topright;
  const marker = new L.Icon({
    iconUrl: MarkerIcon,
    iconRetinaUrl: MarkerIcon,
    popupAnchor: [-0, -0],
    iconSize: [25, 41],
  });
  return (
    <>
      {position === null ? null : (
        <Marker
          ref={markerRef}
          draggable
          position={position}
          eventHandlers={eventHandlers}
          icon={marker}
        >
          {/* <Popup>Drag and drop to choose location</Popup> */}
        </Marker>
      )}
      {pos && (
        <div className={positionClass}>
          <div className="leaflet-control leaflet-bar">
            <a onClick={() => map.locate()}>
              <AimOutlined />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
const defaultCenter = { lat: 20.945, lng: 105.9773 };
export function MapContainer({ value, onChange, style, ...props }) {
  // const { t } = useTranslation();
  const handleChange = (val) => {
    if (onChange) {
      onChange(val);
    }
  };
  const latlng = useMemo(() => {
    if (typeof value == 'string') {
      const arr = value?.split(',');
      if (arr?.length == 2) {
        const [lat, lng] = arr;
        return { lat, lng };
      } else return null;
    } else if (Array.isArray(value)) {
      const [lat, lng] = value;
      return { lat, lng };
    } else return value;
  }, [value]);
  // const prov = OpenStreetMapProvider();

  return (
    <div style={style}>
      <Wrapper
        style={{ width: '100%', height: 500, borderRadius: 8 }}
        center={defaultCenter}
        zoom={13}
        {...props}
      >
        {/* <SearchControl
          provider={prov}
          showMarker={true}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={'Enter address, please'}
          keepResult={true}
        /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position="bottomleft"
          defaulLocal={latlng}
          onChange={handleChange}
        ></LocationMarker>
      </Wrapper>
    </div>
  );
}
