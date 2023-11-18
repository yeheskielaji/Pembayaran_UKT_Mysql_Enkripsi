fetch('/payment', {
    method: 'POST',
    body: formData // Sesuaikan dengan data yang dikirim
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        // Tampilkan modal atau pesan bahwa pembayaran berhasil
        $('#successModal').modal('show');
    } else {
        // Tampilkan pesan kesalahan jika ada
        console.error('Error:', data.message);
    }
})
.catch(error => {
    console.error('Error:', error);
});
