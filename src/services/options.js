export const GET = () => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
}

export const GET_AUTH = (token) => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}

export const POST = (body) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body)
  }
}

export const POST_AUTH = (body, token) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }
}

export const POST_FORM_DATA = (body) => {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: body
  }
}