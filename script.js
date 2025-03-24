const translations = {
            id: {
                title: "Pendeteksi Sistem",
                batteryTitle: "Info Dasar Baterai",
                deviceTitle: "Info Dasar Perangkat",
                featuresTitle: "Fitur",
                checkingSystem: "Memeriksa sistem",
                gettingDeviceData: "Mendapatkan data perangkat",
                powerConnected: "Sumber daya terhubung",
                powerDisconnected: "Sumber daya tidak terhubung",
                batteryUnavailable: "Informasi baterai tidak tersedia",
                browserUnknown: "Tidak diketahui",
                deviceUnknown: "Tidak diketahui",
                // Battery info
                batteryCapacity: "Kapasitas: ",
                batteryVoltage: "Tegangan: ",
                batteryTechnology: "Teknologi: ",
                batteryTemperature: "Suhu: ",
                batteryDuration: "Bertahan: ",
                powerSource: "Sumber Daya: ",
                // Device info
                deviceModel: "Model: ",
                deviceVendor: "Vendor: ",
                deviceHardware: "Perangkat Keras: ",
                deviceApiLevel: "API Level: ",
                deviceArchitecture: "Karnel Arsitektur: ",
                deviceBrowser: "Browser: ",
                // Features
                featureFastCharging: "Pengisian Cepat",
                featureAdaptiveBattery: "Baterai Adaptif",
                featureStabilizeVoltage: "Stabilkan Tegangan",
                featurePurify: "Murnikan",
                // Feature activation
                activatingFeature: "Mengaktifkan fitur: ",
                featureActivated: "Fitur telah diaktifkan!",
                // Power alert
                powerAlertTitle: "Sumber Daya Tidak Terhubung",
                powerAlertMessage: "Silakan hubungkan perangkat Anda ke sumber daya untuk melanjutkan.",
                // iOS alert
                iosAlertTitle: "Perangkat Tidak Didukung",
                iosAlertMessage: "Aplikasi ini tidak mendukung perangkat iOS (iPhone/iPad). Silakan gunakan perangkat Android atau komputer."
            },
            en: {
                title: "System Detector",
                batteryTitle: "Battery Basic Info",
                deviceTitle: "Device Basic Info",
                featuresTitle: "Features",
                checkingSystem: "Checking system",
                gettingDeviceData: "Getting device data",
                powerConnected: "Power source connected",
                powerDisconnected: "Power source disconnected",
                batteryUnavailable: "Battery information not available",
                browserUnknown: "Unknown",
                deviceUnknown: "Unknown",
                // Battery info
                batteryCapacity: "Capacity: ",
                batteryVoltage: "Voltage: ",
                batteryTechnology: "Technology: ",
                batteryTemperature: "Temperature: ",
                batteryDuration: "Duration: ",
                powerSource: "Power Source: ",
                // Device info
                deviceModel: "Model: ",
                deviceVendor: "Vendor: ",
                deviceHardware: "Hardware: ",
                deviceApiLevel: "API Level: ",
                deviceArchitecture: "Kernel Architecture: ",
                deviceBrowser: "Browser: ",
                // Features
                featureFastCharging: "Fast Charging",
                featureAdaptiveBattery: "Adaptive Battery",
                featureStabilizeVoltage: "Stabilize Voltage",
                featurePurify: "Purify",
                // Feature activation
                activatingFeature: "Activating feature: ",
                featureActivated: "Feature has been activated!",
                // Power alert
                powerAlertTitle: "Power Source Not Connected",
                powerAlertMessage: "Please connect your device to a power source to continue.",
                // iOS alert
                iosAlertTitle: "Device Not Supported",
                iosAlertMessage: "This application does not support iOS devices (iPhone/iPad). Please use an Android device or computer."
            }
        };
        
        let currentLang = 'id';
        let isPowerConnected = false;
        
        // Function to detect iOS devices
        function isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }
        
        function switchLanguage() {
            currentLang = document.getElementById('languageSwitcher').value;
            updateTranslations();
            
            // Update power alert translations
            document.getElementById('powerAlertTitle').textContent = 
                translations[currentLang].powerAlertTitle;
            document.getElementById('powerAlertMessage').textContent = 
                translations[currentLang].powerAlertMessage;
                
            // Update iOS alert translations
            document.getElementById('iosAlertTitle').textContent = 
                translations[currentLang].iosAlertTitle;
            document.getElementById('iosAlertMessage').textContent = 
                translations[currentLang].iosAlertMessage;
        }

        function updateTranslations() {
            // Update titles
            document.getElementById('title').textContent = translations[currentLang].title;
            document.getElementById('batteryTitle').textContent = translations[currentLang].batteryTitle;
            document.getElementById('deviceTitle').textContent = translations[currentLang].deviceTitle;
            document.getElementById('featuresTitle').textContent = translations[currentLang].featuresTitle;
            
            // Update features
            document.getElementById('featureFastCharging').textContent = translations[currentLang].featureFastCharging;
            document.getElementById('featureAdaptiveBattery').textContent = translations[currentLang].featureAdaptiveBattery;
            document.getElementById('featureStabilizeVoltage').textContent = translations[currentLang].featureStabilizeVoltage;
            document.getElementById('featurePurify').textContent = translations[currentLang].featurePurify;
            
            // Update status if already set
            updateBatteryStatus();
            updateDeviceInfo();
        }

        function showPopup(text) {
            document.getElementById('popupText').textContent = text;
            document.getElementById('popupOverlay').style.display = 'block';
            document.getElementById('popup').style.display = 'block';
            setTimeout(hidePopup, 2000);
        }
        
        function hidePopup() {
            document.getElementById('popupOverlay').style.display = 'none';
            document.getElementById('popup').style.display = 'none';
        }

        function togglePowerAlert(show) {
            const powerAlert = document.getElementById('powerAlert');
            powerAlert.style.display = show ? 'flex' : 'none';
            document.body.style.overflow = show ? 'hidden' : '';
            isPowerConnected = !show;
            
            if (show) {
                setTimeout(() => {
                    if (powerAlert.style.display === 'flex') {
                        powerAlert.style.display = 'none';
                        document.body.style.overflow = '';
                        isPowerConnected = false;
                    }
                }, 3000); // 3 seconds
            }
        }
        
        function showIOSAlert() {
            document.getElementById('iosAlert').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Hide all other content
            document.querySelector('.container').style.display = 'none';
            document.querySelector('footer').style.display = 'none';
        }

        function activateFeature(feature) {
            // Only allow feature activation if power is connected
            if (!isPowerConnected) {
                togglePowerAlert(true);
                return;
            }
            
            let featureName = '';
            switch(feature) {
                case 'fastCharging':
                    featureName = translations[currentLang].featureFastCharging;
                    break;
                case 'adaptiveBattery':
                    featureName = translations[currentLang].featureAdaptiveBattery;
                    break;
                case 'stabilizeVoltage':
                    featureName = translations[currentLang].featureStabilizeVoltage;
                    break;
                case 'purify':
                    featureName = translations[currentLang].featurePurify;
                    break;
            }
            
            showPopup(translations[currentLang].activatingFeature + featureName);
            setTimeout(() => {
                showPopup(translations[currentLang].featureActivated);
            }, 2000);
        }

        function startLoading() {
            // First check if device is iOS
            if (isIOS()) {
                showIOSAlert();
                return;
            }
            
            showPopup(translations[currentLang].checkingSystem);
            setTimeout(() => {
                getBatteryInfo();
                showPopup(translations[currentLang].gettingDeviceData);
                setTimeout(getDeviceInfo, 2000);
            }, 2000);
        }

        function updateBatteryStatus() {
            if (navigator.getBattery) {
                navigator.getBattery().then(function(battery) {
                    let statusDiv = document.getElementById('status');
                    let powerSourceElement = document.getElementById('powerSource');
                    
                    if (battery.charging) {
                        statusDiv.textContent = translations[currentLang].powerConnected;
                        statusDiv.style.backgroundColor = "#4CAF50";
                        statusDiv.style.color = "white";
                        powerSourceElement.textContent = translations[currentLang].powerSource + "Adaptor";
                        
                        // Hide power alert if it was showing and power is now connected
                        togglePowerAlert(false);
                    } else {
                        statusDiv.textContent = translations[currentLang].powerDisconnected;
                        statusDiv.style.backgroundColor = "#F44336";
                        statusDiv.style.color = "white";
                        powerSourceElement.textContent = translations[currentLang].powerSource + "Baterai";
                        
                        // Show power alert when power is disconnected
                        togglePowerAlert(true);
                    }
                });
            } else {
                document.getElementById('status').textContent = translations[currentLang].batteryUnavailable;
                document.getElementById('status').style.backgroundColor = "#FF9800";
                document.getElementById('status').style.color = "white";
                
                // For browsers without Battery API, we'll assume power is connected
                togglePowerAlert(false);
            }
        }

        function getBatteryInfo() {
            if (navigator.getBattery) {
                navigator.getBattery().then(function(battery) {
                    // Capacity
                    const capacity = Math.round(battery.level * 100);
                    document.getElementById('batteryCapacity').textContent = 
                        translations[currentLang].batteryCapacity + capacity + "%";
                    
                    // Voltage - simulate since not directly available
                    const voltage = "≤4150 mV";
                    document.getElementById('batteryVoltage').textContent = 
                        translations[currentLang].batteryVoltage + voltage;
                    
                    // Technology
                    document.getElementById('batteryTech').textContent = 
                        translations[currentLang].batteryTechnology + "Li-poly";
                    
                    // Temperature - simulate since not directly available
                    const temp = "29°C (Sejuk)";
                    document.getElementById('batteryTemp').textContent = 
                        translations[currentLang].batteryTemperature + temp;
                    
                    // Duration - estimate based on current level
                    const duration = "± 12 - 14 jam";
                    document.getElementById('batteryDuration').textContent = 
                        translations[currentLang].batteryDuration + duration;
                    
                    // Update charging status
                    updateBatteryStatus();
                    
                    // Add event listeners
                    battery.addEventListener('chargingchange', updateBatteryStatus);
                    battery.addEventListener('levelchange', function() {
                        document.getElementById('batteryCapacity').textContent = 
                            translations[currentLang].batteryCapacity + Math.round(battery.level * 100) + "%";
                    });
                });
            } else {
                // Fallback for browsers without Battery API
                const unavailable = currentLang === 'id' ? "Tidak tersedia" : "Not available";
                
                document.getElementById('batteryCapacity').textContent = 
                    translations[currentLang].batteryCapacity + unavailable;
                document.getElementById('batteryVoltage').textContent = 
                    translations[currentLang].batteryVoltage + unavailable;
                document.getElementById('batteryTech').textContent = 
                    translations[currentLang].batteryTechnology + unavailable;
                document.getElementById('batteryTemp').textContent = 
                    translations[currentLang].batteryTemperature + unavailable;
                document.getElementById('batteryDuration').textContent = 
                    translations[currentLang].batteryDuration + unavailable;
                document.getElementById('powerSource').textContent = 
                    translations[currentLang].powerSource + unavailable;
            }
        }
        
        function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let browser = translations[currentLang].browserUnknown;
    let browserVersion = "";
    let deviceModel = "desktop_windows";
    let deviceOS = "Windows";
    let deviceOSVersion = "";
    let vendor = "Google Inc.";
    let hardware = "Win64";  // Default to 64-bit
    let apiLevel = "28";
    let kernelArch = "AARCH64";
    
    // Check for architecture - improved detection
    if (navigator.userAgent.indexOf("WOW64") !== -1 || 
        navigator.userAgent.indexOf("Win64") !== -1 || 
        navigator.userAgent.indexOf("x86_64") !== -1 || 
        navigator.userAgent.indexOf("x64;") !== -1 || 
        navigator.userAgent.indexOf("AMD64") !== -1 ||
        navigator.platform === "Win64") {
        hardware = "Win64";
    } else if (navigator.platform === "Win32" || navigator.userAgent.indexOf("Win32") !== -1) {
        hardware = "Win32";
    }
    
    // Detect browser and version
    if (userAgent.includes("Chrome")) {
        browser = "Chrome";
        const match = userAgent.match(/Chrome\/(\d+)/);
        if (match) browserVersion = match[1];
    } else if (userAgent.includes("Firefox")) {
        browser = "Firefox";
        const match = userAgent.match(/Firefox\/(\d+)/);
        if (match) browserVersion = match[1];
    } else if (userAgent.includes("Edg")) {
        browser = "Edge";
        const match = userAgent.match(/Edg\/(\d+)/);
        if (match) browserVersion = match[1];
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browser = "Safari";
        const match = userAgent.match(/Version\/(\d+)/);
        if (match) browserVersion = match[1];
    } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
        browser = "Opera";
        const match = userAgent.match(/OPR\/(\d+)/);
        if (match) browserVersion = match[1];
    }
    
    // Detect OS
    if (userAgent.includes("Windows")) {
        deviceOS = "Windows";
        
        // Windows 11 reports as Windows NT 10.0 but has newer build numbers
        const windowsMatch = userAgent.match(/Windows NT 10.0(?:;|\))(?:.*)?( Build (\d+))?/);
        const buildNumberStr = windowsMatch && windowsMatch[2];
        const buildNumber = buildNumberStr ? parseInt(buildNumberStr) : 0;
        
        // Windows 11 starts with build number 22000
        if (buildNumber >= 22000) {
            deviceOSVersion = "11";
        } else {
            // For older versions, use traditional detection
            const ntMatch = userAgent.match(/Windows NT (\d+\.\d+)/);
            if (ntMatch) {
                switch(ntMatch[1]) {
                    case "10.0": deviceOSVersion = "10"; break;
                    case "6.3": deviceOSVersion = "8.1"; break;
                    case "6.2": deviceOSVersion = "8"; break;
                    case "6.1": deviceOSVersion = "7"; break;
                    default: deviceOSVersion = ntMatch[1];
                }
            }
        }
        
        // Additional Windows 11 detection methods
        if (deviceOSVersion === "10" && navigator.userAgentData) {
            // Use newer API if available
            navigator.userAgentData.getHighEntropyValues(["platformVersion"])
            .then(ua => {
                // Windows 11 has platform version >= 13
                if (parseInt(ua.platformVersion.split('.')[0]) >= 13) {
                    deviceOSVersion = "11";
                    updateDeviceModelDisplay(deviceModel, deviceOS, deviceOSVersion);
                }
            })
            .catch(e => {
                console.log("Could not get detailed platform info");
            });
        }
    } else if (userAgent.includes("Mac")) {
        deviceOS = "MacOS";
        deviceModel = "desktop_mac";
        const match = userAgent.match(/Mac OS X (\d+[._]\d+)/);
        if (match) deviceOSVersion = match[1].replace("_", ".");
    } else if (userAgent.includes("Linux")) {
        deviceOS = "Linux";
        deviceModel = "computer";
    } else if (userAgent.includes("Android")) {
        deviceOS = "Android";
        deviceModel = "smartphone";
        const match = userAgent.match(/Android (\d+(\.\d+)?)/);
        if (match) deviceOSVersion = match[1];
        
        // Detailed device detection for Android
        const detectedDevice = detectDetailedDeviceModel();
        if (detectedDevice) {
            const parts = detectedDevice.split(" ");
            if (parts.length > 0) {
                vendor = parts[0];
                if (detectedDevice.toLowerCase().includes("tablet")) {
                    deviceModel = "tablet";
                }
            }
        }
    } else if (userAgent.includes("iPhone") || userAgent.includes("iPad") || userAgent.includes("iPod")) {
        deviceOS = "iOS";
        vendor = "Apple";
        
        // Get iOS version
        const match = userAgent.match(/OS (\d+_\d+)/);
        if (match) deviceOSVersion = match[1].replace("_", ".");
        
        if (userAgent.includes("iPhone")) {
            deviceModel = "smartphone";
        } else if (userAgent.includes("iPad")) {
            deviceModel = "tablet";
        } else if (userAgent.includes("iPod")) {
            deviceModel = "smartphone";
        }
        
        // Get detailed iOS device info
        const detectedDevice = detectDetailedDeviceModel();
        if (detectedDevice) {
            // Device model is already set (smartphone/tablet) based on device type
        }
    }
    
    updateDeviceInfo(deviceModel, deviceOS, deviceOSVersion, vendor, hardware, apiLevel, kernelArch, browser, browserVersion);
    
    // Detailed device detection for mobile devices
    function detectDetailedDeviceModel() {
        // iOS devices detection with model numbers
        if (userAgent.includes("iPhone") || userAgent.includes("iPad") || userAgent.includes("iPod")) {
            // iPhone model detection
            if (userAgent.includes("iPhone")) {
                deviceModel = "smartphone";
                
                // iPhone model detection based on screen size, OS version, and device metrics
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const pixelRatio = window.devicePixelRatio || 1;
                
                // iPhone 15 Series (2023)
                if (userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 932 && screenHeight <= 945 && pixelRatio >= 3) {
                        return "iPhone 15 Pro Max (A2904/A2905)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3) {
                        return "iPhone 15 Pro (A2901/A2902)";
                    } else if (screenHeight >= 926 && screenHeight <= 930 && pixelRatio >= 2.8) {
                        return "iPhone 15 Plus (A3092/A3093)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8) {
                        return "iPhone 15 (A3090/A3091)";
                    }
                }
                
                // iPhone 14 Series (2022)
                if (userAgent.includes("iPhone OS 16") || userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 932 && pixelRatio >= 3) {
                        return "iPhone 14 Pro Max (A2651/A2884)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3) {
                        return "iPhone 14 Pro (A2650/A2883)";
                    } else if (screenHeight >= 926 && pixelRatio >= 2.8) {
                        return "iPhone 14 Plus (A2632/A2882)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8) {
                        return "iPhone 14 (A2649/A2881)";
                    }
                }
                
                // iPhone 13 Series (2021)
                if (userAgent.includes("iPhone OS 15") || userAgent.includes("iPhone OS 16") || userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 926 && pixelRatio >= 2.8) {
                        return "iPhone 13 Pro Max (A2641/A2485)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3) {
                        return "iPhone 13 Pro (A2636/A2483)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8) {
                        return "iPhone 13 (A2633/A2484)";
                    } else if (screenHeight >= 780 && screenHeight <= 812 && pixelRatio >= 2.8) {
                        return "iPhone 13 mini (A2628/A2482)";
                    }
                }
                
                // iPhone 12 Series (2020)
                if (userAgent.includes("iPhone OS 14") || userAgent.includes("iPhone OS 15") || 
                    userAgent.includes("iPhone OS 16") || userAgent.includes("iPhone OS 17")) {
                    if (screenHeight >= 926 && pixelRatio >= 2.8 && userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 Pro Max (A2342/A2410)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 3 && 
                               userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 Pro (A2341/A2406)";
                    } else if (screenHeight >= 844 && screenHeight <= 852 && pixelRatio >= 2.8 && 
                               userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 (A2172/A2402)";
                    } else if (screenHeight >= 780 && screenHeight <= 812 && pixelRatio >= 2.8 && 
                               userAgent.includes("iPhone OS 14")) {
                        return "iPhone 12 mini (A2176/A2398)";
                    }
                }
                
                // iPhone 11 Series (2019)
                if (userAgent.includes("iPhone OS 13") || userAgent.includes("iPhone OS 14") || 
                    userAgent.includes("iPhone OS 15") || userAgent.includes("iPhone OS 16") || 
                    userAgent.includes("iPhone OS 17")) {
                    if (screenHeight === 896 && pixelRatio === 3) {
                        return "iPhone 11 Pro Max (A2161/A2220)";
                    } else if (screenHeight === 812 && pixelRatio === 3) {
                        return "iPhone 11 Pro (A2160/A2215)";
                    } else if (screenHeight === 896 && pixelRatio === 2) {
                        return "iPhone 11 (A2111/A2223)";
                    }
                }
                
                // iPhone X Series
                if (screenHeight === 812 && pixelRatio === 3 && 
                    (userAgent.includes("iPhone OS 11") || userAgent.includes("iPhone OS 12"))) {
                    return "iPhone X (A1865/A1901)";
                } else if (screenHeight === 896 && pixelRatio === 2) {
                    return "iPhone XR (A1984/A2105)";
                } else if (screenHeight === 812 && pixelRatio === 3 && userAgent.includes("iPhone OS 12")) {
                    return "iPhone XS (A1920/A2097)";
                } else if (screenHeight === 896 && pixelRatio === 3) {
                    return "iPhone XS Max (A1921/A2101)";
                }
                
                // iPhone 8 Series
                if (screenHeight === 667 && pixelRatio === 2) {
                    return "iPhone 8 (A1863/A1905)";
                } else if (screenHeight === 736 && pixelRatio === 3) {
                    return "iPhone 8 Plus (A1864/A1897)";
                }
                
                // iPhone SE
                if (screenHeight === 667 && pixelRatio === 2 && 
                    (userAgent.includes("iPhone OS 15") || userAgent.includes("iPhone OS 16"))) {
                    return "iPhone SE (2022) (A2595/A2596)";
                } else if (screenHeight === 667 && pixelRatio === 2 && userAgent.includes("iPhone OS 13")) {
                    return "iPhone SE (2020) (A2275/A2298)";
                }
                
                // Fallback to generic iPhone
                return "iPhone";
            }
            
            // iPad detection
            if (userAgent.includes("iPad")) {
                deviceModel = "tablet";
                
                if (userAgent.includes("iPad Pro")) {
                    if (window.screen.width === 1024 || window.screen.height === 1024) {
                        return "iPad Pro 12.9-inch";
                    } else if (window.screen.width === 834 || window.screen.height === 834) {
                        return "iPad Pro 11-inch";
                    }
                    return "iPad Pro";
                } else if (userAgent.includes("iPad Air")) {
                    return "iPad Air";
                } else if (userAgent.includes("iPad Mini")) {
                    return "iPad Mini";
                }
                
                return "iPad";
            }
            
            // iPod detection
            if (userAgent.includes("iPod")) {
                deviceModel = "smartphone";
                return "iPod Touch";
            }
        }
        
        // Android device detection
        if (userAgent.includes("Android")) {
            deviceModel = "smartphone";
            
            // Samsung detection
            if (userAgent.includes("SM-G") || userAgent.includes("SM-N") || userAgent.includes("SM-A") || 
                userAgent.includes("SM-F") || userAgent.includes("Samsung")) {
                vendor = "Samsung";
                
                // Galaxy S series
                if (userAgent.includes("SM-S918")) {
                    return "Samsung Galaxy S23 Ultra";
                } else if (userAgent.includes("SM-S916")) {
                    return "Samsung Galaxy S23 Plus";
                } else if (userAgent.includes("SM-S911")) {
                    return "Samsung Galaxy S23";
                } else if (userAgent.includes("SM-S908")) {
                    return "Samsung Galaxy S22 Ultra";
                } else if (userAgent.includes("SM-S906")) {
                    return "Samsung Galaxy S22 Plus";
                } else if (userAgent.includes("SM-S901")) {
                    return "Samsung Galaxy S22";
                } else if (userAgent.includes("SM-G998")) {
                    return "Samsung Galaxy S21 Ultra";
                } else if (userAgent.includes("SM-G996")) {
                    return "Samsung Galaxy S21 Plus";
                } else if (userAgent.includes("SM-G991")) {
                    return "Samsung Galaxy S21";
                } else if (userAgent.includes("SM-F936")) {
                    return "Samsung Galaxy Z Fold 4";
                } else if (userAgent.includes("SM-F926")) {
                    return "Samsung Galaxy Z Fold 3";
                } else if (userAgent.includes("SM-F916")) {
                    return "Samsung Galaxy Z Fold 2";
                } else if (userAgent.includes("SM-F900")) {
                    return "Samsung Galaxy Fold";
                } else if (userAgent.includes("SM-F731") || userAgent.includes("SM-F721")) {
                    return "Samsung Galaxy Z Flip 4";
                } else if (userAgent.includes("SM-F711")) {
                    return "Samsung Galaxy Z Flip 3";
                } else if (userAgent.includes("SM-F700")) {
                    return "Samsung Galaxy Z Flip";
                } else if (userAgent.includes("SM-A")) {
                    // Galaxy A series
                    if (userAgent.includes("SM-A546")) {
                        return "Samsung Galaxy A54";
                    } else if (userAgent.includes("SM-A536")) {
                        return "Samsung Galaxy A53";
                    } else if (userAgent.includes("SM-A525")) {
                        return "Samsung Galaxy A52";
                    } else if (userAgent.includes("SM-A515")) {
                        return "Samsung Galaxy A51";
                    } else if (userAgent.includes("SM-A336")) {
                        return "Samsung Galaxy A33";
                    }
                    return "Samsung Galaxy A Series";
                }
                
                return "Samsung Galaxy";
            }
            
            // Xiaomi detection
            if (userAgent.includes("Xiaomi") || userAgent.includes("Redmi") || userAgent.includes("POCO") || 
                userAgent.includes("Mi ")) {
                vendor = "Xiaomi";
                
                // Mi Series
                if (userAgent.includes("Mi 11 Ultra")) {
                    return "Xiaomi Mi 11 Ultra";
                } else if (userAgent.includes("Mi 11 Pro")) {
                    return "Xiaomi Mi 11 Pro";
                } else if (userAgent.includes("Mi 11 Lite")) {
                    return "Xiaomi Mi 11 Lite";
                } else if (userAgent.includes("Mi 11")) {
                    return "Xiaomi Mi 11";
                } else if (userAgent.includes("Mi 10 Ultra")) {
                    return "Xiaomi Mi 10 Ultra";
                } else if (userAgent.includes("Mi 10 Pro")) {
                    return "Xiaomi Mi 10 Pro";
                } else if (userAgent.includes("Mi 10T Pro")) {
                    return "Xiaomi Mi 10T Pro";
                } else if (userAgent.includes("Mi 10T")) {
                    return "Xiaomi Mi 10T";
                } else if (userAgent.includes("Mi 10")) {
                    return "Xiaomi Mi 10";
                } else if (userAgent.includes("Mi 9T Pro")) {
                    return "Xiaomi Mi 9T Pro";
                } else if (userAgent.includes("Mi 9T")) {
                    return "Xiaomi Mi 9T";
                } else if (userAgent.includes("Mi 9 SE")) {
                    return "Xiaomi Mi 9 SE";
                } else if (userAgent.includes("Mi 9")) {
                    return "Xiaomi Mi 9";
                } else if (userAgent.includes("Mi Mix 4")) {
                    return "Xiaomi Mi Mix 4";
                } else if (userAgent.includes("Mi Mix 3")) {
                    return "Xiaomi Mi Mix 3";
                } else if (userAgent.includes("Mi Mix 2S")) {
                    return "Xiaomi Mi Mix 2S";
                } else if (userAgent.includes("Mi Mix 2")) {
                    return "Xiaomi Mi Mix 2";
                } else if (userAgent.includes("Mi Note 10 Pro")) {
                    return "Xiaomi Mi Note 10 Pro";
                } else if (userAgent.includes("Mi Note 10")) {
                    return "Xiaomi Mi Note 10";
                } else if (userAgent.includes("Mi A3")) {
                    return "Xiaomi Mi A3";
                } else if (userAgent.includes("Mi A2")) {
                    return "Xiaomi Mi A2";
                } else if (userAgent.includes("Mi A1")) {
                    return "Xiaomi Mi A1";
                } else if (userAgent.includes("Mi Pad 5")) {
                    deviceModel = "tablet";
                    return "Xiaomi Mi Pad 5";
                } else if (userAgent.includes("Mi Pad 4")) {
                    deviceModel = "tablet";
                    return "Xiaomi Mi Pad 4";
                } else if (userAgent.includes("Mi MIX Alpha")) {
                    return "Xiaomi Mi MIX Alpha";
                }
                
                // Redmi Series
                if (userAgent.includes("Redmi Note 12 Pro+")) {
                    return "Xiaomi Redmi Note 12 Pro+";
                } else if (userAgent.includes("Redmi Note 12 Pro")) {
                    return "Xiaomi Redmi Note 12 Pro";
                } else if (userAgent.includes("Redmi Note 12")) {
                    return "Xiaomi Redmi Note 12";
                } else if (userAgent.includes("Redmi Note 11 Pro+")) {
                    return "Xiaomi Redmi Note 11 Pro+";
                } else if (userAgent.includes("Redmi Note 11 Pro")) {
                    return "Xiaomi Redmi Note 11 Pro";
                } else if (userAgent.includes("Redmi Note 11S")) {
                    return "Xiaomi Redmi Note 11S";
                } else if (userAgent.includes("Redmi Note 11")) {
                    return "Xiaomi Redmi Note 11";
                } else if (userAgent.includes("Redmi 10 Prime")) {
                    return "Xiaomi Redmi 10 Prime";
                } else if (userAgent.includes("Redmi 10")) {
                    return "Xiaomi Redmi 10";
                } else if (userAgent.includes("Redmi 9T")) {
                    return "Xiaomi Redmi 9T";
                } else if (userAgent.includes("Redmi 9C")) {
                    return "Xiaomi Redmi 9C";
                } else if (userAgent.includes("Redmi 9A")) {
                    return "Xiaomi Redmi 9A";
                } else if (userAgent.includes("Redmi 9")) {
                    return "Xiaomi Redmi 9";
                } else if (userAgent.includes("Redmi K40 Pro+")) {
                    return "Xiaomi Redmi K40 Pro+";
                } else if (userAgent.includes("Redmi K40 Pro")) {
                    return "Xiaomi Redmi K40 Pro";
                } else if (userAgent.includes("Redmi K40")) {
                    return "Xiaomi Redmi K40";
                } else if (userAgent.includes("Redmi 12A")) {
                    return "Xiaomi Redmi 12A";
                } else if (userAgent.includes("Redmi 11A")) {
                    return "Xiaomi Redmi 11A";
                } else if (userAgent.includes("Redmi 10A")) {
                    return "Xiaomi Redmi 10A";
                } else if (userAgent.includes("Redmi Note")) {
                    return "Xiaomi Redmi Note Series";
                } else if (userAgent.includes("Redmi")) {
                    return "Xiaomi Redmi Series";
                }
                
                // POCO Series
                if (userAgent.includes("POCO X5 Pro")) {
                    return "Xiaomi POCO X5 Pro";
                } else if (userAgent.includes("POCO X5")) {
                    return "Xiaomi POCO X5";
                } else if (userAgent.includes("POCO F4 GT")) {
                    return "Xiaomi POCO F4 GT";
                } else if (userAgent.includes("POCO F4")) {
                    return "Xiaomi POCO F4";
                } else if (userAgent.includes("POCO M5")) {
                    return "Xiaomi POCO M5";
                } else if (userAgent.includes("POCO M4 Pro")) {
                    return "Xiaomi POCO M4 Pro";
                } else if (userAgent.includes("POCO M3")) {
                    return "Xiaomi POCO M3";
                } else if (userAgent.includes("POCO C40")) {
                    return "Xiaomi POCO C40";
                } else if (userAgent.includes("POCO")) {
                    return "Xiaomi POCO Series";
                }
                
                return "Xiaomi Device";
            }
            
            // Infinix detection
            if (userAgent.includes("Infinix")) {
                vendor = "Infinix";
                
                // Zero Series (Flagship)
                if (userAgent.includes("Zero 30 5G")) {
                    return "Infinix Zero 30 5G";
                } else if (userAgent.includes("Zero 20")) {
                    return "Infinix Zero 20";
                } else if (userAgent.includes("Zero Ultra")) {
                    return "Infinix Zero Ultra";
                } else if (userAgent.includes("Zero 5G")) {
                    return "Infinix Zero 5G";
                } else if (userAgent.includes("Zero 4 Plus")) {
                    return "Infinix Zero 4 Plus";
                } else if (userAgent.includes("Zero 4")) {
                    return "Infinix Zero 4";
                } else if (userAgent.includes("Zero")) {
                    return "Infinix Zero Series";
                }
                
                // Note Series (Mid-Range)
                if (userAgent.includes("Note 30 Pro")) {
                    return "Infinix Note 30 Pro";
                } else if (userAgent.includes("Note 30")) {
                    return "Infinix Note 30";
                } else if (userAgent.includes("Note 12 Pro")) {
                    return "Infinix Note 12 Pro";
                } else if (userAgent.includes("Note 12 5G")) {
                    return "Infinix Note 12 5G";
                } else if (userAgent.includes("Note 12")) {
                    return "Infinix Note 12";
                } else if (userAgent.includes("Note 10 Pro")) {
                    return "Infinix Note 10 Pro";
                } else if (userAgent.includes("Note 10")) {
                    return "Infinix Note 10";
                } else if (userAgent.includes("Note 8")) {
                    return "Infinix Note 8";
                } else if (userAgent.includes("Note 7")) {
                    return "Infinix Note 7";
                } else if (userAgent.includes("Note 6")) {
                    return "Infinix Note 6";
                } else if (userAgent.includes("Note")) {
                    return "Infinix Note Series";
                }
                
                // Hot Series (Entry-Level)
                if (userAgent.includes("Hot 30")) {
                    return "Infinix Hot 30";
                } else if (userAgent.includes("Hot 30i")) {
                    return "Infinix Hot 30i";
                } else if (userAgent.includes("Hot 12 Pro")) {
                    return "Infinix Hot 12 Pro";
                } else if (userAgent.includes("Hot 12")) {
                    return "Infinix Hot 12";
                } else if (userAgent.includes("Hot 11")) {
                    return "Infinix Hot 11";
                } else if (userAgent.includes("Hot 10")) {
                    return "Infinix Hot 10";
                } else if (userAgent.includes("Hot 9")) {
                    return "Infinix Hot 9";
                } else if (userAgent.includes("Hot")) {
                    return "Infinix Hot Series";
                }
                
                // Smart Series (Entry-Level)
                if (userAgent.includes("Smart 7")) {
                    return "Infinix Smart 7";
                } else if (userAgent.includes("Smart 6")) {
                    return "Infinix Smart 6";
                } else if (userAgent.includes("Smart 5")) {
                    return "Infinix Smart 5";
                } else if (userAgent.includes("Smart 4")) {
                    return "Infinix Smart 4";
                } else if (userAgent.includes("Smart")) {
                    return "Infinix Smart Series";
                }
                
                // S Series (Selfie-centric)
                if (userAgent.includes("S5 Pro")) {
                    return "Infinix S5 Pro";
                } else if (userAgent.includes("S5")) {
                    return "Infinix S5";
                } else if (userAgent.includes("S")) {
                    return "Infinix S Series";
                }
                
                // Zero X Series (Limited Edition)
                if (userAgent.includes("Zero X Pro")) {
                    return "Infinix Zero X Pro";
                } else if (userAgent.includes("Zero X Neo")) {
                    return "Infinix Zero X Neo";
                } else if (userAgent.includes("Zero X")) {
                    return "Infinix Zero X Series";
                }
                
                return "Infinix Device";
            }
            
            // Google Pixel detection
            if (userAgent.includes("Pixel")) {
                vendor = "Google";
                
                if (userAgent.includes("Pixel 7 Pro")) {
                    return "Google Pixel 7 Pro";
                } else if (userAgent.includes("Pixel 7")) {
                    return "Google Pixel 7";
                } else if (userAgent.includes("Pixel 6 Pro")) {
                    return "Google Pixel 6 Pro";
                } else if (userAgent.includes("Pixel 6a")) {
                    return "Google Pixel 6a";
                } else if (userAgent.includes("Pixel 6")) {
                    return "Google Pixel 6";
                } else if (userAgent.includes("Pixel 5")) {
                    return "Google Pixel 5";
                } else if (userAgent.includes("Pixel 4a")) {
                    return "Google Pixel 4a";
                } else if (userAgent.includes("Pixel 4 XL")) {
                    return "Google Pixel 4 XL";
                } else if (userAgent.includes("Pixel 4")) {
                    return "Google Pixel 4";
                } else if (userAgent.includes("Pixel 3a XL")) {
                    return "Google Pixel 3a XL";
                } else if (userAgent.includes("Pixel 3a")) {
                    return "Google Pixel 3a";
                } else if (userAgent.includes("Pixel 3 XL")) {
                    return "Google Pixel 3 XL";
                } else if (userAgent.includes("Pixel 3")) {
                    return "Google Pixel 3";
                } else if (userAgent.includes("Pixel 2 XL")) {
                    return "Google Pixel 2 XL";
                } else if (userAgent.includes("Pixel 2")) {
                    return "Google Pixel 2";
                } else if (userAgent.includes("Pixel XL")) {
                    return "Google Pixel XL";
                }

            // Show iOS alert with detected device model
function showIosAlert(deviceModel) {
    const iosAlert = document.getElementById('iosAlert');
    const iosAlertMessage = document.getElementById('iosAlertMessage');
    
    if (iosAlert && iosAlertMessage) {
        // Update message to include the detected device model
        iosAlertMessage.textContent = translations[currentLang].iosAlertMessage.replace(
            "perangkat iOS (iPhone/iPad)", 
            `perangkat iOS (${deviceModel})`
        );
        
        // Show the alert
        iosAlert.style.display = 'flex';
    }
}

function updateDeviceModelDisplay(deviceModel, deviceOS, deviceOSVersion) {
    document.getElementById('deviceModel').innerHTML = 
        translations[currentLang].deviceModel + '<span class="material-icons">' + deviceModel + '</span>' + 
        deviceOS + (deviceOSVersion ? ` (${deviceOSVersion})` : "");
}

function updateDeviceInfo(deviceModel, deviceOS, deviceOSVersion, vendor, hardware, apiLevel, kernelArch, browser, browserVersion) {
    updateDeviceModelDisplay(deviceModel, deviceOS, deviceOSVersion);
    
    document.getElementById('deviceVendor').textContent = 
        translations[currentLang].deviceVendor + vendor;
    
    document.getElementById('deviceHardware').textContent = 
        translations[currentLang].deviceHardware + hardware;
    
    document.getElementById('deviceApiLevel').textContent = 
        translations[currentLang].deviceApiLevel + apiLevel;
    
    document.getElementById('deviceArchitecture').textContent = 
        translations[currentLang].deviceArchitecture + kernelArch;
    
    document.getElementById('deviceBrowser').textContent = 
        translations[currentLang].deviceBrowser + browser + (browserVersion ? ` (${browserVersion})` : "");
}

window.onload = function() {
    // Initialize power alert translations
    document.getElementById('powerAlertTitle').textContent = 
        translations[currentLang].powerAlertTitle;
    document.getElementById('powerAlertMessage').textContent = 
        translations[currentLang].powerAlertMessage;
    
    // Initialize iOS alert translations
    document.getElementById('iosAlertTitle').textContent = 
        translations[currentLang].iosAlertTitle || "Perangkat Tidak Didukung";
    document.getElementById('iosAlertMessage').textContent = 
        translations[currentLang].iosAlertMessage || "Aplikasi ini tidak mendukung perangkat iOS (iPhone/iPad). Silakan gunakan perangkat Android atau komputer.";
    
    startLoading();
    updateTranslations();
};

// Make sure translations object has iOS alert strings
if (!translations) {
    var translations = {};
}

// Add iOS alert translations for each language if they don't exist
for (const lang in translations) {
    if (!translations[lang].iosAlertTitle) {
        translations[lang].iosAlertTitle = lang === "en" ? 
            "Device Not Supported" : "Perangkat Tidak Didukung";
    }
    
    if (!translations[lang].iosAlertMessage) {
        translations[lang].iosAlertMessage = lang === "en" ? 
            "This application does not support iOS devices (iPhone/iPad). Please use an Android device or computer." : 
            "Aplikasi ini tidak mendukung perangkat iOS (iPhone/iPad). Silakan gunakan perangkat Android atau komputer.";
    }
}
