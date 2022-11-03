/* eslint-disable @typescript-eslint/no-namespace */
import type { GeoJsonProperties } from 'geojson';
import L from 'leaflet';

declare module 'leaflet' {
  namespace TileLayer {
    interface WMS {
      getFeatureInfoDisabled: boolean
      getFeatureInfo: (evt: L.LeafletMouseEvent) => void
      getFeatureInfoUrl: (latlng: L.LatLngExpression) => string | undefined
      showGetFeatureInfo: (content: GeoJSON.FeatureCollection, latlng: L.LatLngExpression) => void
    }
  }

}

L.TileLayer.WMS.prototype.getFeatureInfoDisabled = false;

const onAdd = L.TileLayer.WMS.prototype.onAdd;

L.TileLayer.WMS.prototype.onAdd = function (map) {
  onAdd.call(this, map);
  map.on('click', this.getFeatureInfo, this);
  return this;
};

const onRemove = L.TileLayer.WMS.prototype.onRemove;

L.TileLayer.WMS.prototype.onRemove = function (map) {
  onRemove.call(this, map);
  map.off('click', this.getFeatureInfo, this);
  return this;
};

L.TileLayer.WMS.prototype.getFeatureInfo = async function (evt: L.LeafletMouseEvent) {
  if (this.getFeatureInfoDisabled) {
    return;
  }
  const url = this.getFeatureInfoUrl(evt.latlng);
  if (!url) {
    return;
  }
  const response = await fetch(url);
  const data = await response.json();

  if (typeof data === 'object') {
    this.showGetFeatureInfo(data as GeoJSON.FeatureCollection, evt.latlng);
  }
};

L.TileLayer.WMS.prototype.getFeatureInfoUrl = function (latlng: L.LatLngExpression) {
  if (!this._map) {
    return;
  }
  const point = this._map.latLngToContainerPoint(latlng);
  const size = this._map.getSize();
  const params = {
    request: 'GetFeatureInfo',
    service: 'WMS',
    srs: 'EPSG:4326',
    styles: this.wmsParams.styles,
    transparent: this.wmsParams.transparent,
    version: this.wmsParams.version,
    format: this.wmsParams.format,
    bbox: this._map.getBounds().toBBoxString(),
    height: size.y,
    width: size.x,
    layers: this.wmsParams.layers,
    query_layers: this.wmsParams.layers,
    info_format: 'application/json',
    i: Math.round(point.x),
    j: Math.round(point.y),
    x: Math.round(point.x),
    y: Math.round(point.y)
  };
  return this._url + L.Util.getParamString(params, this._url, true);
};

L.TileLayer.WMS.prototype.showGetFeatureInfo = function (content: GeoJSON.FeatureCollection, latlng: L.LatLngExpression) {
  if (content.features.length === 0) {
    return;
  }
  L.popup()
    .setLatLng(latlng)
    .setContent(getTableHTML(content.features[0].properties, content.features[0].id))
    .openOn(this._map);
}

function getTableHTML(properties: GeoJsonProperties, name?: string | number) {
  let html = `<div class="getFeatureClass"><p>${name}</p><div>`;

  html += Object.entries(properties as object).filter(([k, v]) => k !== 'cat' && v).reduce((html, [k, v]) => {
    html += `<tr><td>${k}</td><td>${v}</td></tr>`;
    return html;
  }, `<table><tbody>`) + `</tbody></table>`;

  html += `</div></div>`;
  return html;
}
