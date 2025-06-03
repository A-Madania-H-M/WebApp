let selectedPaymentMethod = '';

function selectPayment(method, element) {
    // Remove previous selection
    document.querySelectorAll('.payment-logos img').forEach(img => {
        img.classList.remove('selected');
    });
    
    // Add selection to clicked element
    element.classList.add('selected');
    
    selectedPaymentMethod = method;
    document.getElementById('payment_method').value = method;
}

function selectPaymentMethod(method) {
    // Keep for backward compatibility
    selectedPaymentMethod = method;
    document.getElementById('payment_method').value = method;
}

function showSuccessPopup(orderData = {}) {
    // Generate order ID if not provided
    const orderId = orderData.orderId || '#ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('orderId').textContent = orderId;
    
    // Show popup with animation
    const popup = document.getElementById('successPopup');
    popup.classList.add('show');
    
    // Store order data for receipt
    window.currentOrderData = {
        orderId: orderId,
        customerName: document.querySelector('input[name="name"]').value,
        customerEmail: document.querySelector('input[name="email"]').value,
        customerPhone: document.querySelector('input[name="phone"]').value,
        paymentMethod: selectedPaymentMethod,
        amount: 'Rp. 1.360.000,00',
        date: new Date().toLocaleDateString('id-ID')
    };
}

function closePopup() {
    const popup = document.getElementById('successPopup');
    popup.classList.remove('show');
    
    // Reset form after popup closes
    setTimeout(() => {
        document.getElementById('payment-form').reset();
        selectedPaymentMethod = '';
        document.getElementById('payment_method').value = '';
        
        // Reset payment method selection UI
        document.querySelectorAll('.payment-logos img').forEach(img => {
            img.classList.remove('selected');
        });
    }, 300);
}

function downloadReceipt() {
    const orderData = window.currentOrderData;
    
    // Create receipt content
    const receiptContent = `
RECEIPT - PORSCHE RENTAL
========================

Order ID: ${orderData.orderId}
Date: ${orderData.date}

Customer Information:
Name: ${orderData.customerName}
Email: ${orderData.customerEmail}
Phone: ${orderData.customerPhone}

Rental Details:
Vehicle: Porsche Cayenne
Rate: Rp. 1.360.000,00 / day
Payment Method: ${orderData.paymentMethod.toUpperCase()}

Total Amount: ${orderData.amount}
Status: CONFIRMED

Thank you for choosing our service!
    `;
    
    // Create and download file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${orderData.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show download confirmation
    alert('Receipt berhasil didownload!');
}

// Enhanced form submission with better UX
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('payment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Validate payment method selection
        if (!selectedPaymentMethod) {
            alert('Silakan pilih metode pembayaran terlebih dahulu.');
            return;
        }
        
        const payButton = document.getElementById('pay-button');
        const buttonText = payButton.querySelector('.button-text');
        
        // Show loading state
        payButton.disabled = true;
        payButton.classList.add('loading');
        buttonText.textContent = 'Memproses...';

        const formData = new FormData(this);

        // Simulate API call (replace with your actual Midtrans integration)
        setTimeout(() => {
            // In real implementation, replace this with actual fetch to midtrans_payment.php
            /*
            fetch('midtrans_payment.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                snap.pay(data.token, {
                    onSuccess: function(result) { 
                        showSuccessPopup({ orderId: result.order_id });
                    },
                    onPending: function(result) { 
                        alert("Pembayaran menunggu konfirmasi!");
                        resetButton();
                    },
                    onError: function(result) { 
                        alert("Terjadi kesalahan saat pembayaran.");
                        resetButton();
                    },
                    onClose: function() { 
                        alert("Anda menutup popup pembayaran.");
                        resetButton();
                    }
                });
            })
            .catch(() => {
                alert("Gagal menghubungi server.");
                resetButton();
            });
            */
            
            // For demo purposes, show success popup after 2 seconds
            showSuccessPopup();
            resetButton();
        }, 2000);
        
        function resetButton() {
            payButton.disabled = false;
            payButton.classList.remove('loading');
            buttonText.textContent = 'Bayar Sekarang';
        }
    });

    // Close popup when clicking outside
    document.getElementById('successPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closePopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});