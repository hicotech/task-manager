export interface Icon {
    /**
     * Icon size passed to width and height attributes of SVG element
     *
     * @default '1.5rem'
     */
    size?: string;

    /**
     * Icon color passed to fill attribute of SVG element
     *
     * @default 'currentColor'
     */
    color?: string;

    /**
     * Allows to pass testid string for testing purposes
     */
    'data-testid'?: string;
}
