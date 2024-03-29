import React from 'react'
import {API} from '../config'


function ShowImage({item, url}) {
  return (
    <div className="product-img">
      <img src={`${API}/${url}/photo/${item._id}`} alt={item.name}
      className="mb-3"  style={{maxHeight: '90%', maxWidth: '90%'}} />
    </div>
  )
}

export default ShowImage;
