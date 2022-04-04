module.exports = function filterData(data) {
  console.log(data.photoset.photo[0])
  console.log(data.photoset.photo[1])

  const photoset = {
    owner: data.photoset.ownername,
    ownerID: data.photoset.owner,
    albumname: data.photoset.title,
    amount: data.photoset.total,
    photos: data.photoset.photo.map(data => {
      const tags = data.tags.split(' ')
      const mapTags = tags.map(tag => {
        return {
          tag: tag
        }
      })
      return {
        id: data.id,
        title: data.title,
        tags: mapTags,
        date: data.datetaken,
        views: data.views,
        o_dims: data.o_dims,
        url_thumbnail: data.url_t,
        url_small: data.url_s,
        url_medium: data.url_m,
        url_large: data.url_l,
        height_t: data.height_t,
        width_t: data.width_t,
        height_s: data.height_s,
        width_s: data.width_s,
        height_m: data.height_m,
        width_m: data.width_m,
        height_l: data.height_l,
        width_l: data.width_l,
      }
    })
  }

  // console.log(photoset)
  return photoset
}