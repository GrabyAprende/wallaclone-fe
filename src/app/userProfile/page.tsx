const UserPage = () => {
    return (
        <div className="flex col-12">
            <div
                style={{
                    borderRight: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: 'rgb(207 216 226 / 90%)',
                    flexDirection: 'column',
                }}
                className="flex col-2 py-4 px-4"
            >
                <span className="text-900 font-medium text-xl">User</span>
                <span className="py-2">email@email.com</span>
            </div>
            <div className=" surface-ground py-8 col-10 xl:col-10">
                <div className="flex justify-content-center mb-8 text-1xl">
                    <div className="col-10 xl:col-10">
                        <h5 className="text-1xl font-small text-900 mb-2">
                            Tus Anuncios
                        </h5>
                        <div className="surface-card p-4 shadow-2 border-round">
                            <table
                                style={{
                                    width: '100%',
                                }}
                                role="table"
                                className=" p-datatable p-datatable-table ng-star-inserted"
                            >
                                <thead
                                    style={{
                                        textAlign: 'left',
                                    }}
                                    role="rowgroup"
                                    className="p-datatable-thead text-align-left"
                                >
                                    <tr className="ng-star-inserted">
                                        <th role="columnheader">Foto</th>
                                        <th role="columnheader">
                                            Nombre del producto
                                        </th>
                                        <th role="columnheader">Precio</th>
                                    </tr>
                                </thead>
                                <tbody
                                    role="rowgroup"
                                    className="p-element p-datatable-tbody"
                                >
                                    <tr className="ng-star-inserted">
                                        <td>
                                            <img
                                                width="80"
                                                className="shadow-4"
                                                src="/images/screen-1.webp"
                                                alt="Bamboo Watch"
                                            />
                                        </td>
                                        <td>Bamboo Watch</td>
                                        <td>65€</td>
                                    </tr>
                                    <tr className="ng-star-inserted">
                                        <td>
                                            <img
                                                width="80"
                                                className="shadow-4"
                                                src="/images/screen-1.webp"
                                                alt="Bamboo Watch"
                                            />
                                        </td>
                                        <td>Bamboo Watch</td>
                                        <td>65€</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex justify-content-center">
                    <div className="col-10 xl:col-10">
                        <h5 className="text-1xl font-medium text-900 mb-2">
                            Tus Favoritos
                        </h5>
                        <div className="surface-card p-4 shadow-2 border-round grid grid-nogutter ng-star-inserted">
                            <div className="card m-3 border-1 surface-border">
                                <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                                    <div className="flex align-items-center">
                                        <i className="pi pi-tags mr-2"></i>
                                        <span className="font-semibold">
                                            On sale
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-column align-items-center text-center mb-3">
                                    <img
                                        width="140"
                                        className="shadow-4"
                                        src="/images/screen-1.webp"
                                        alt="Bamboo Watch"
                                    />
                                    <span className="text-1l font-bold mt-2">
                                        Blue Band
                                    </span>
                                </div>
                                <div className="flex align-items-center justify-content-between">
                                    <span className="text-1l font-semibold">
                                        78€
                                    </span>
                                    <button
                                        className="p-ripple p-element p-button p-component p-button-icon-only"
                                        type="button"
                                    >
                                        <span className="pi pi-heart-fill p-button-icon ng-star-inserted"></span>
                                        <span
                                            className="p-ink"
                                            aria-hidden="true"
                                            role="presentation"
                                        ></span>
                                    </button>
                                </div>
                            </div>
                            <div className="card m-3 border-1 surface-border">
                                <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                                    <div className="flex align-items-center">
                                        <i className="pi pi-tags mr-2"></i>
                                        <span className="font-semibold">
                                            On sale
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-column align-items-center text-center mb-3">
                                    <img
                                        width="140"
                                        className="shadow-4"
                                        src="/images/screen-1.webp"
                                        alt="Bamboo Watch"
                                    />
                                    <span className="text-1l font-bold mt-2">
                                        Blue Band
                                    </span>
                                </div>
                                <div className="flex align-items-center justify-content-between">
                                    <span className="text-1l font-semibold">
                                        78€
                                    </span>
                                    <button
                                        className="p-ripple p-element p-button p-component p-button-icon-only"
                                        type="button"
                                    >
                                        <span className="pi pi-heart-fill p-button-icon ng-star-inserted"></span>
                                        <span
                                            className="p-ink"
                                            aria-hidden="true"
                                            role="presentation"
                                        ></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
