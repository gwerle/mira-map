/**
 * Transform a object to a URLSearchParams
 * @params Must be key=value, and value must be a string or an array of strings
 */

interface ParamsI {
  [key: string]: any;
}

export function formatParams(params: ParamsI): URLSearchParams | ParamsI {
  const paramsFormatted = new URLSearchParams();

  if (!params) {
    return params;
  }

  Object.keys(params).forEach(key => {
    if (Array.isArray(params[key])) {
      return (params[key] as string[]).forEach((arrayKey: string) => {
        paramsFormatted.append(key, arrayKey);
      });
    }

    if (params[key]) {
      return paramsFormatted.append(key, params[key] as string);
    }

    return null;
  });

  return paramsFormatted;
}
