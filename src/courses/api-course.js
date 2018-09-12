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

const list = () => {
  return fetch('/api/courses/', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
  return fetch('/api/courses/' + params.courseId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const update = (params, credentials, course) => {
  return fetch('/api/courses/' + params.courseId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: course
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
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

const follow = (params, credentials, followId) => {
  return fetch('/api/courses/follow/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({courseId:params.courseId, followId: followId})
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const unfollow = (params, credentials, unfollowId) => {
  return fetch('/api/courses/unfollow/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({courseId:params.courseId, unfollowId: unfollowId})
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const findCourses = (params, credentials) => {
  console.log(params)
  return fetch('/api/courses/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}


const listCoursesByUser = (params, credentials) => {
  return fetch('/api/courses/by/'+ params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then(response => {
    console.log(response)
    return response.json()
  }).catch((err) => console.log(err))
}


export {
  create,
  list,
  read,
  update,
  remove,
  follow,
  unfollow,
  findCourses,
  listCoursesByUser
}
