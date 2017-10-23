/**
 * The roc object that other packages can base themselves on.
 *
 * This roc object has intentionally been left quite empty. This since the package does nothing currently
 * but we like to have it in the ecosystem to be able to extend and add things here in the future without
 * requiring everything to be updated with new references.
 */
 // eslint-disable-next-line
export const roc = {
    description: `
        Package forming an abstract foundation of the Roc ecosystem.

        The package serves as a base from which other packages within the ecosystem are to be constructed.
        It is therefore _never to be included_ as a direct dependency in app or component projects.`,
};
