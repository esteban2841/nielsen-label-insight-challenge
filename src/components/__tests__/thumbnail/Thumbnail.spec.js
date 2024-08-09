import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Thumbnail from '../../views/Thumbnail.vue'

describe('Thumbnail', () => {
  it('renders correctly with an empty array of thumbnails', async () => {
    const wrapper = mount(Thumbnail)
    expect(wrapper.exists()).toBe(true)

    expect(wrapper.findAll('.thumb-container').length).toBe(0)
  })

  it('renders thumbnails correctly', async () => {
    const thumbnails = [
      {
        id: 1,
        thumbnailUrl: 'url1.jpg',
        title:
          'ndar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente ig'
      },
      {
        id: 2,
        thumbnailUrl: 'url2.jpg',
        title:
          'como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su '
      }
    ]
    const wrapper = mount(Thumbnail, {
      global: {
        stubs: {
          Modal: true
        }
      },
      props: {
        thumbnails
      }
    })
    expect(wrapper.findAll('.thumb-container').length).toBe(2)
  })
})
