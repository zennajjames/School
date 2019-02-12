const create = (course) => {
    console.log(course)
    console.log("Adding new course...")
    return fetch('/api/courses/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }
  
  const upload = (data) => {
    console.log(data)
    console.log("Uploading file...")
    return fetch('/api/upload/', {
      method: 'POST',
			body: data
		})
      .then((response) => {
        console.log("Response")
        console.log(response)
      }).catch((err) => console.log(err))
  }
  
  const update = (params, course) => {
    console.log(course)
    return fetch('/api/courses/' + params.courseId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      },
      body: course
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const list = () => {
    return fetch('/api/courses/', {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const listOne = (params) => {
    console.log(params)
    return fetch('/api/courses/'+ params.courseId, {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const remove = (params, credentials) => {
    return fetch('/api/courses/' + params.courseId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const read = (params) => {
    console.log(params)
    return fetch('/api/courses/' + params.courseId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return console.log(response)
    }).catch((err) => console.log(err))
  }
  
  export {
    create,
    upload,
    update,
    remove,
    list, 
    listOne,
    read
  }