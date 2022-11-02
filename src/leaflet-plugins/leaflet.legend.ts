/* eslint-disable @typescript-eslint/no-namespace */
import L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    class Legend extends Control {
      toggleLegendForLayer: (layer: L.TileLayer.WMS, checked: boolean, title?: string) => void
    }
  }

  namespace control {
    function legend(options: ControlOptions): Control.Legend;
  }
}

L.Control.Legend = L.Control.extend({
  options: {},

  onAdd: function () {
    const container = L.DomUtil.create('div'),
      content = L.DomUtil.create('div'),
      title = L.DomUtil.create('span');

    title.id = 'leaflet-legend-title';
    title.innerHTML = 'Map legend';
    container.id = 'leaflet-legend-container';
    content.id = 'leaflet-legend-content';
    container.className = 'leaflet-legend';
    container.appendChild(title);
    container.appendChild(content);
    return container;
  },

  toggleLegendForLayer: function (layer: L.TileLayer.WMS, checked: boolean, title?: string) {
    const content = L.DomUtil.get('leaflet-legend-content');
    const elementID = 'legend_' + layer.wmsParams.layers;

    if (checked) {
      const div = L.DomUtil.create('div');
      div.id = elementID;
      div.className = 'leaflet-legend-item';

      const p = L.DomUtil.create('p');
      p.className = 'leaflet-legend-layer-name';
      p.innerHTML = title || layer.wmsParams.layers;

      const img = L.DomUtil.create('img');
      img.src = `${layer._url}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${layer.wmsParams.layers}`;

      div.appendChild(p);
      div.appendChild(img);
      content?.appendChild(div);
    }
    else {
      const img = L.DomUtil.get(elementID);

      if (img && content?.contains(img)) {
        content.removeChild(img);
      }
    }
  }
});

L.control.legend = function (opts) {
  return new L.Control.Legend(opts);
}
