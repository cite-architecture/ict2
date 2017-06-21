# ict2

version 0.1.0

An Image Citation tool for working with CITE2 URNs.

The single-page webapp allows a user to retrieve an image via CITE2 URN, and by drawing rectangles on it, create versions of the image’s URN extended by a region-of-interest.

So if `urn:cite2:hmt:vaimg.v1:VA012RN_0013` represents an entire image of folio 12 recto of the Venetus A manuscript, `urn:cite2:hmt:vaimg.v1:VA012RN_0013@0.2066,0.2084,0.1672,0.02437` identifies only the rectangle bounding the title “ΙΛΙΑΔΟΣ ΑΛΦΑ” on that image.

## Quickest Start

<http://www.homermultitext.org/ict2/index.html>

## Quickstart

- Clone or download this repository.
- Open `index.html` in a browser.
- Experiment with the following Image URNs (the ones represented in the sample data:

~~~
  urn:cite2:hmt:vaimg.v1:VA012RN_0013
  urn:cite2:hmt:vaimg.v1:VA012RND_0892
  urn:cite2:hmt:vaimg.v1:VA012RUV_0893
  urn:cite2:hmt:vaimg.v1:VA012RUVD_0894
  urn:cite2:hmt:vaimg.v1:VA012RUVD_0895
  urn:cite2:hmt:vaimg.v1:VA012VN_0514
~~~

## Passing a URN as an HTTP Request parameter

…you can.

E.g. <http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.v1:VA012RND_0892>

If you pass a URN as a parameter-value, and the URN already has a region-of-interest identified by a subreference, ICT2 will pre-load that ROI:

<http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.v1:VA012RND_0892@0.5888,0.3201,0.02874,0.03513>

## Notes

The web-app can work with local image files or remote files. `v.1.1.0` includes a small library of demonstration files in `image_archive`. As of 6/16/2017, the online repository which ICT2 has as its default is not offering the 'Access Control Allow Origin' header necessary for ICT2 to retrieve its data. For some reason, Safari will let the remote service work, but only when running ICT2 directly from the filesystem.

## What are CITE2 URNs?

CITE2 URNs are part of the [CITE Architecture](http://cite-architecture.github.io); they identify objects in a collection. ICT2 is intended to work with images in a collection, identifiable by URNs. As of January, 2017, we revised our standard for identifying collections and object, hence `CITE2`.

### Parts of a CITE2 URN

`urn:cite2:hmt:vaimg.v1:VA012RN_0013`

- `urn:cite2:hmt:` = namespaces
- `vaimg` = collection-ID
- `v1` = version of collection
- `VA012RN_0013` = object-ID
