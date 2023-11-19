import homePageService from '../services/homePageService';

const renderHomePage = async (req, res) => {
    try {
        const payments = await homePageService.getPayments();
        // Render halaman homepage dengan data yang diterima dari service
        return res.render("homepage.ejs",{
            payments: payments,
        });
    } catch (error) {
        // Tangani kesalahan jika ada
        console.error(error);
        res.status(500).send('Terjadi kesalahan');
    }
};

module.exports = {
    renderHomePage : renderHomePage,
};
