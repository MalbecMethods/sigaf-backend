import requests
from bs4 import BeautifulSoup
import json

def traer_noticias():
    url = requests.get('https://www.bing.com/news/search?q=argentina+hidrocarburos&qpvt=noticias+argentina+hidrocarburos&FORM=EWRE')
    soup = BeautifulSoup(url.content, 'html.parser')

    titles = []
    descriptions = []
    links = []
    images = []

    # Encontrar todos los contenedores de noticias
    news_containers = soup.find_all('div', class_='news-card newsitem cardcommon')

    for container in news_containers:
        # Título y enlace
        title_tag = container.find('a', class_='title')
        if title_tag:
            titles.append(title_tag.text.strip())
            links.append(title_tag.get('href'))

        # Descripción
        snippet_tag = container.find('div', class_='snippet')
        if snippet_tag:
            descriptions.append(snippet_tag.text.strip())

        # Imagen
        image_tag = container.find('img')
        if image_tag and image_tag.has_attr('data-src'):
            img_src = image_tag['data-src']
            if img_src.startswith('//'):
                img_src = 'https:' + img_src
            elif img_src.startswith('/'):
                img_src = 'https://www.bing.com' + img_src
            images.append(img_src)
        elif image_tag and image_tag.has_attr('src'):
            img_src = image_tag['src']
            if img_src.startswith('//'):
                img_src = 'https:' + img_src
            elif img_src.startswith('/'):
                img_src = 'https://www.bing.com' + img_src
            images.append(img_src)
        else:
            images.append('No image')

    # Asegurarse de que todas las listas tengan la misma longitud
    min_length = min(len(titles), len(descriptions), len(links), len(images))
    news_data = [{"titulo": titles[i], "descripcion": descriptions[i], "link": links[i], "imagen": images[i]} for i in range(min_length)]

    return news_data

# Ejemplo de uso
noticias = traer_noticias()
print(json.dumps(noticias, indent=4, ensure_ascii=False))
