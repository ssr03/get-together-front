import React, {Component} from "react";

import GoogleMapReact from "google-map-react";

const API_KEY = "AIzaSyBnBlipOjNesyFkAIAlXO9WkkIhfiqUIi4";

class GoogleMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            map:null,
            maps:null, 
            searchmarker:null
        }
    }
    static defaultProps = {
        center: {
          lat: 37.56,
          lng: 126.97
        },
        zoom: 16
      };
    
    handleApiLoaded = (map, maps) => {
        this.setState({ map: map, maps: maps });

        const address = this.props.address;
        if(address!==undefined){
          this.props.onLocation(map)
        }
    }    

    renderMarkers = (map, maps) => {
        let myLatLng = this.props.myLatLng;
        if (JSON.stringify(myLatLng) !== "{}") {
          map.setCenter(myLatLng);
          let marker = new maps.Marker({
            position: myLatLng,
            map,
            title: this.props.location
          });
        }
    };
   
    //주소 변환
    geocodeAddress = (map, address) => {
        const geocoder = new window.google.maps.Geocoder();
        let searchmarker = this.state.searchmarker;
        geocoder.geocode(
          { address: address },
          function(results, status) {
            if (status === "OK") {
              if (searchmarker !== null) {
                console.log(searchmarker)
                searchmarker.setMap(null);
              }
    
              map.setCenter(results[0].geometry.location);
    
              let full_address = results[0].formatted_address;
    
              searchmarker = new window.google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: full_address
              });
              map.setZoom(15);
              //좌표 받기
              const lat = searchmarker.position.lat(); //위도
              const lng = searchmarker.position.lng(); //경도
    
              const address = full_address
                .split(" ")
                .slice(1)
                .join(" ");
              
              if(this.state.searchmarker===null
                  ||this.state.searchmarker.title!==searchmarker.title){
                    this.setState({
                    searchmarker:searchmarker
                  })
                  this.props.onLocation(lat,lng,address);
              }
            } else {
              
              alert(status);
            }
          }.bind(this)
        );
    };

    componentDidUpdate = () => {
        const map = this.state.map;
        
        const maps = this.state.maps;
        const myLatLng = this.props.myLatLng;
        if(map!==null&&myLatLng!==undefined){
            this.renderMarkers(map,maps);
        }
    }
    
    render(){
        return(
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                    this.handleApiLoaded(map, maps)
                }
            />

        )
    }
}

export default GoogleMap;