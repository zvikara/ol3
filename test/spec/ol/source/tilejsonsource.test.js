goog.provide('ol.test.source.TileJSON');


describe('ol.source.TileJSON', function() {

  describe('tileUrlFunction', function() {

    var source, tileGrid;

    beforeEach(function(done) {
      source = new ol.source.TileJSON({
        url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
      });
      var key = source.on('change', function() {
        if (source.getState() === 'ready') {
          source.unByKey(key);
          tileGrid = source.getTileGrid();
          done();
        }
      });
    });

    it('uses the correct tile coordinates', function() {

      var coordinate = [829330.2064098881, 5933916.615134273];
      var regex = /\/([0-9]*\/[0-9]*\/[0-9]*)\.png$/;
      var tileUrl;

      tileUrl = source.tileUrlFunction(
          tileGrid.getTileCoordForCoordAndZ(coordinate, 0));
      expect(tileUrl.match(regex)[1]).to.eql('0/0/0');

      tileUrl = source.tileUrlFunction(
          tileGrid.getTileCoordForCoordAndZ(coordinate, 1));
      expect(tileUrl.match(regex)[1]).to.eql('1/1/0');

      tileUrl = source.tileUrlFunction(
          tileGrid.getTileCoordForCoordAndZ(coordinate, 2));
      expect(tileUrl.match(regex)[1]).to.eql('2/2/1');

      tileUrl = source.tileUrlFunction(
          tileGrid.getTileCoordForCoordAndZ(coordinate, 3));
      expect(tileUrl.match(regex)[1]).to.eql('3/4/2');

      tileUrl = source.tileUrlFunction(
          tileGrid.getTileCoordForCoordAndZ(coordinate, 4));
      expect(tileUrl.match(regex)[1]).to.eql('4/8/5');

      tileUrl = source.tileUrlFunction(
          tileGrid.getTileCoordForCoordAndZ(coordinate, 5));
      expect(tileUrl.match(regex)[1]).to.eql('5/16/11');

      tileUrl = source.tileUrlFunction(
          tileGrid.getTileCoordForCoordAndZ(coordinate, 6));
      expect(tileUrl.match(regex)[1]).to.eql('6/33/22');

    });

  });

});

goog.require('ol.TileCoord');
goog.require('ol.source.TileJSON');
