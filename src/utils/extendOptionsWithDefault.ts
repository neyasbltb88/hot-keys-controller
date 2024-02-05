/**
 * @description Утилита для объединения объекта необязательных опций, где может быть не полный набор всех полей опций
 * с объектом дефолтных опций, который содержит полный набор всех полей.
 * Если каких-то полей нет в options, они будут дополнены из defaultOptions.
 * @param {Partial<T>} options Объект, в котором могут быть только некоторые поля из набора опций.
 * @param {Required<T>} defaultOptions Объект, в котором присутствуют все поля опций с их дефолтными значениями.
 * @returns {Required<T>} Возвращает глубокую копию объекта options, дополненную полями из defaultOptions.
 */
const extendOptionsWithDefault = <T extends object>(options: T, defaultOptions: Required<T>): Required<T> => {
    return Object.assign({}, options, defaultOptions)
};

export default extendOptionsWithDefault;
export { extendOptionsWithDefault };
