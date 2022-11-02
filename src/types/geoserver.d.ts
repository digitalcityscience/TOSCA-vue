declare namespace GS {
  interface FeatureTypes {
    featureTypes: {
      featureType: Reference[]
    }
  }

  interface FeatureType {
    featureType: FeatureTypeInfo
  }

  interface FeatureTypeInfo {
    store: {
      '@class': string
      name: string
      href: string
    }
    maxFeatures: number
    abstract: string
    nativeName: string
    numDecimals: number
    overridingServiceSRS: boolean
    circularArcPresent: boolean
    metadatalinks: {
      metadataLink: {
        type: string
        metadataType: string
        content: string
      }[]
    }
    keywords: {
      string: string[]
    }
    name: string
    nativeCRS: string
    linearizationTolerance: number
    dataLinks: {
      metadataLink: {
        type: string
        content: string
      }[]
    }
    metadata: MetadataEntry[]
    nativeBoundingBox: {
      minx: number
      maxx: number
      miny: number
      maxy: number
      crs: string
    }
    responseSRS: {
      string: string
    }
    srs: string
    cqlFilter: string
    attributes: {
      attribute: {
        name: string
        minOccurs: number
        maxOccurs: number
        nillable: boolean
        binding: string
        length: number
      }[]
    }
    title: string
    latLonBoundingBox: {
      minx: number
      maxx: number
      miny: number
      maxy: number
      crs: string
    }
    namespace: {
      name: string
      href: string
    }
    skipNumberMatched: boolean
  }

  interface WMSLayers  {
    wmsLayers: {
      wmsLayer: Reference[]
    }
  }

  interface WMSLayer {
    wmsLayer: WMSLayerInfo
  }

  interface WMSLayerInfo {
    projectionPolicy: string
    store: {
      '@class': string
      name: string
      href: string
    }
    enabled: boolean
    abstract: string
    nativeName: string
    selectedRemoteStyles: string[]
    maxScale: number
    metadatalinks: {
      metadataLink: {
        type: string
        metadataType: string
        content: string
      }[]
    }
    keywords: {
      string: string[]
    }
    name: string
    metadataBBoxRespected: boolean
    nativeCRS: string
    dataLinks: {
      metadataLink: {
        type: string
        content: string
      }[]
    }
    metadata: MetadataEntry[]
    nativeBoundingBox: {
      minx: number
      maxx: number
      miny: number
      maxy: number
      crs: string
    }
    allAvailableRemoteStyles: StyleInfo[]
    forcedRemoteStyle: string
    srs: string
    minScale: number
    title: string
    preferredFormat: string
    latLonBoundingBox: {
      minx: number
      maxx: number
      miny: number
      maxy: number
      crs: string
    }
    namespace: {
      name: string
      link: string
    }
    selectedRemoteFormats: string[]
    description: string
  }

  interface MetadataEntry {
    '@key': string
    '$': string
  }

  interface Reference {
    name: string
    link: string
  }

  interface StyleInfo {
    name: string
    format: string
    languageVersion: {
      version: string
    }
    legend: {
      width: number
      height: number
      format: string
      onlineResource: string
    }
  }
}
