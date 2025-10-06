// Smooth scrolling functions
function scrollToTool() {
    document.getElementById('tool').scrollIntoView({ behavior: 'smooth' });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// FAQ toggle functionality
function toggleFAQ(index) {
    const content = document.getElementById(`faq-content-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Image upload and processing functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const imageInput = document.getElementById('imageInput');
    const generateBtn = document.getElementById('generateBtn');
    const outputArea = document.getElementById('outputArea');
    const downloadSection = document.getElementById('downloadSection');
    
    let uploadedImage = null;
    
    // Click to upload
    dropZone.addEventListener('click', () => {
        imageInput.click();
    });
    
    // Drag and drop functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-amber-500', 'bg-gray-600');
    });
    
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-amber-500', 'bg-gray-600');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-amber-500', 'bg-gray-600');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    });
    
    // File input change
    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });
    
    // Handle image upload
    function handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage = e.target.result;
            
            // Update drop zone to show uploaded image
            dropZone.innerHTML = `
                <img src="${uploadedImage}" alt="Uploaded image" class="max-w-full max-h-32 mx-auto rounded-lg mb-2">
                <p class="text-green-400 text-sm">Image uploaded successfully!</p>
                <p class="text-xs text-gray-500">Click to change image</p>
            `;
            
            // Enable generate button
            generateBtn.disabled = false;
            generateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        };
        reader.readAsDataURL(file);
    }
    
    // Generate AI homeless man image
    generateBtn.addEventListener('click', function() {
        if (!uploadedImage) {
            alert('Please upload an image first.');
            return;
        }
        
        // Show loading state
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Generating...';
        generateBtn.disabled = true;
        
        // Simulate AI processing (replace with actual API call)
        setTimeout(() => {
            generateAIImage();
        }, 3000);
    });
    
    function generateAIImage() {
        // Show progress bar
        showProgressBar();
        
        // After progress completes, show quota modal
        const randomDelay = Math.floor(Math.random() * 15000) + 5000; // Random 5-20 seconds
        setTimeout(() => {
            showQuotaModal();
            // Reset generate button
            generateBtn.innerHTML = '<i class="fas fa-magic mr-2"></i>Generate AI Homeless Man';
            generateBtn.disabled = false;
        }, randomDelay);
    }
    
    function showProgressBar() {
        const progressHTML = `
            <div class="bg-gray-600 rounded-lg p-8 text-center">
                <div class="mb-6">
                    <i class="fas fa-magic text-4xl text-amber-400 mb-4 animate-pulse"></i>
                    <h3 class="text-xl font-bold text-white mb-2">Generating AI Homeless Man...</h3>
                    <p class="text-gray-300">Please wait while our AI creates your realistic image</p>
                </div>
                
                <div class="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div id="progressBar" class="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
                
                <div class="text-sm text-gray-400">
                    <span id="progressText">Initializing AI model...</span>
                </div>
            </div>
        `;
        
        outputArea.innerHTML = progressHTML;
        
        // Animate progress bar
        animateProgress();
    }
    
    function animateProgress() {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        let progress = 0;
        
        const progressSteps = [
            { progress: 20, text: "Loading AI model..." },
            { progress: 40, text: "Analyzing your image..." },
            { progress: 60, text: "Generating homeless man figure..." },
            { progress: 80, text: "Applying realistic details..." },
            { progress: 95, text: "Finalizing image..." },
            { progress: 100, text: "Almost done..." }
        ];
        
        let stepIndex = 0;
        
        const interval = setInterval(() => {
            if (stepIndex < progressSteps.length) {
                const step = progressSteps[stepIndex];
                progressBar.style.width = step.progress + '%';
                progressText.textContent = step.text;
                stepIndex++;
            } else {
                clearInterval(interval);
            }
        }, 600);
    }
    
    function showQuotaModal() {
        // Create modal overlay
        const modalHTML = `
            <div id="quotaModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div class="bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center">
                    <div class="mb-6">
                        <i class="fas fa-exclamation-triangle text-6xl text-amber-400 mb-4"></i>
                        <h2 class="text-2xl font-bold text-white mb-2">Daily Free Quota Exhausted</h2>
                        <p class="text-gray-300">Today's free generation quota has been used up.</p>
                    </div>
                    
                    
                    <div class="flex space-x-3">
                        <a href="https://banana-ai.art/ai-homeless-man" target="_blank" class="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
                            <i class="fas fa-external-link-alt mr-2"></i>Get Free Quota
                        </a>
                        <button onclick="closeQuotaModal()" class="flex-1 border-2 border-gray-600 text-gray-300 hover:bg-gray-700 font-bold py-3 px-4 rounded-lg transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Reset output area
        outputArea.innerHTML = `
            <div class="bg-gray-600 rounded-lg p-8 text-center min-h-64 flex items-center justify-center">
                <div class="text-gray-400">
                    <i class="fas fa-image text-6xl mb-4"></i>
                    <p class="text-lg">Your AI homeless man image will appear here</p>
                    <p class="text-sm mt-2">Upload an image and click generate to start</p>
                </div>
            </div>
        `;
    }
    
    // Close modal function (global scope)
    window.closeQuotaModal = function() {
        const modal = document.getElementById('quotaModal');
        if (modal) {
            modal.remove();
        }
    }
    
    // Download functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('button')?.textContent.includes('Download HD')) {
            downloadImage();
        } else if (e.target.closest('button')?.textContent.includes('Share')) {
            shareImage();
        }
    });
    
    function downloadImage() {
        // Create download link
        const link = document.createElement('a');
        link.download = 'ai-homeless-man-generated.jpg';
        link.href = uploadedImage; // In real implementation, this would be the generated image
        link.click();
        
        showNotification('Image downloaded successfully!', 'success');
    }
    
    function shareImage() {
        if (navigator.share) {
            navigator.share({
                title: 'AI Homeless Man Generated Image',
                text: 'Check out this realistic AI homeless man image I created!',
                url: window.location.href
            });
        } else {
            // Fallback - copy link to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            });
        }
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 
            'bg-blue-600'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info'} mr-2"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Initialize generate button as disabled
    generateBtn.disabled = true;
    generateBtn.classList.add('opacity-50', 'cursor-not-allowed');
});

// Slider styling
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('input[type="range"]');
    
    slider.addEventListener('input', function() {
        const value = (this.value - this.min) / (this.max - this.min) * 100;
        this.style.background = `linear-gradient(to right, #f59e0b 0%, #f59e0b ${value}%, #4b5563 ${value}%, #4b5563 100%)`;
    });
    
    // Initialize slider styling
    slider.dispatchEvent(new Event('input'));
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.bg-gray-800, .bg-gray-700').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .slider::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #f59e0b;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .slider::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #f59e0b;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);
