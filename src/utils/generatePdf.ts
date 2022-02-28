import { PointsI } from '../@types';

export default function generatePdf(points: PointsI[]): any {
  const data = {
    pageSize: 'A3',
    pageOrientation: 'landscape',
    content: [
      {
        style: 'tableExample',
        image:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABOCAYAAABlsVlbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjY4NzIyQzlCQzk0MTFFQjg2MURDREQ4RUU0NEY1OUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjY4NzIyQzhCQzk0MTFFQjg2MURDREQ4RUU0NEY1OUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODYxQjg4QkM5N0Y2MTFFQjkzNENDQUY5RDJCODkzQkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODYxQjg4QkQ5N0Y2MTFFQjkzNENDQUY5RDJCODkzQkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TFzYuAAA8bklEQVR42ux9B3wc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',
        width: 70,
        margin: [0, 0, 0, 15],
      },
      {
        style: 'tableExample',
        table: {
          body: [
            [
              'Id',
              'Nome',
              'Cidade',
              'Estado',
              'Sistema de Produção',
              'Email',
              'Tipo Ovo',
              'Produção Ovos',
              'Quantidade Animais',
              'Latitude',
              'Longitude',
            ],
            [
              points.map(point => {
                return point.id;
              }),
              points.map(point => {
                return point.farm_name;
              }),
              points.map(point => {
                return point.city;
              }),
              points.map(point => {
                return point.state;
              }),
              points.map(point => {
                return point.production_system;
              }),
              points.map(point => {
                return point.email;
              }),
              points.map(point => {
                return point.egg_type;
              }),
              points.map(point => {
                return point.avg_egg_production;
              }),
              points.map(point => {
                return point.animals_quantity;
              }),
              points.map(point => {
                return point.lat.toFixed(4);
              }),
              points.map(point => {
                return point.lng.toFixed(4);
              }),
            ],
          ],
        },
      },
    ],
    styles: {
      tableExample: {
        margin: [0, 5, 0, 15],
        fontSize: 8,
        border: 0,
      },
    },
  };

  return data;
}