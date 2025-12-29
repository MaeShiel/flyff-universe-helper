# Flyff Universe Bot

> Advanced browser extension for Flyff Universe automation with buff management, party skills, and timeline sequences.

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/MaeShiel/flyff-universe-helper)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Chrome](https://img.shields.io/badge/chrome-supported-brightgreen.svg)](https://www.google.com/chrome/)
[![Firefox](https://img.shields.io/badge/firefox-supported-orange.svg)](https://www.mozilla.org/firefox/)

## 📖 Description

A powerful automation tool for Flyff Universe that enhances gameplay with customizable buff systems, party skill automation, and intelligent key sequencing. Save time on repetitive tasks while maintaining full control over your character's actions.

## ✨ Features

### 🎯 Monster Detection

-   **Template Matching**: Detects monsters using image matching with 70% confidence threshold
-   **Auto-Click**: Automatically targets and clicks detected monsters
-   **Visual Feedback**: Red circle indicator on detected targets
-   **Press `Alt`** to manually trigger detection

### 💪 Buff Management System

-   **12 Configurable Buffs**: Patient, Mental, Quick Step, Heap Up, Haste, Cat's Reflex, Cannon Ball, Beef Up, Accuracy, Protect, Spirit Fortune, Geburah Tiphreth
-   **Custom Activation Key**: Set any hotkey to trigger all buffs
-   **Smart Warnings**: Configurable expiration alerts with visual and audio feedback
-   **Auto Pause/Resume**: Pauses active timelines during buff activation
-   **Press `` ` ``** (default) to activate all buffs

### 🎊 Party Skills Automation

-   **Linked Attack**: 60 presses @ 500ms interval
-   **Global Attack**: Full automation support
-   **Lucky Drop**: 12 presses @ 500ms interval
-   **Gift Box**: Complete automation
-   **Custom Keybinds**: Configure location and activation keys

### ⚙️ Timeline & Key Automation

-   **Timeline Sequences**: Create multi-step automation chains
-   **Key Press Automation**: Individual key automation with precise timing
-   **Click Automation**: Mouse click sequences at specific coordinates
-   **Modifier Support**: Alt, Ctrl, Shift combinations
-   **Special Keys**: Tab, Space, Enter, Escape, and more

### 🔄 Auto Follow System

-   **Persistent Following**: Ensures continuous target following
-   **Auto-Retry**: Re-activates if follow breaks
-   **5-Second Intervals**: Automatic follow checks
-   **Works with Z key** (Flyff default)

### 💾 Configuration Profiles

-   **Save/Load**: Multiple character configurations
-   **Named Profiles**: Organize setups by character name
-   **Persistent Storage**: All settings saved locally
-   **Quick Switch**: Load profiles instantly

## 🚀 Installation

### Prerequisites

-   Node.js (v14 or higher)
-   Chrome or Firefox browser
-   Flyff Universe account
    -   Time should be setted on ms, as example 1 second will be: 1000
    -   Shift / Alt / Ctrl - Supported, as example `Alt+1` & `Ctrl+1` & `Shift+1`
    -   Tab / Space / Enter & etc - Supported, as example `Escape` & `Space` & `Tab` & `Enter`
-   **Auto Follow** - Sometimes autofollow in Flyff breaks and you find your support not following you anymore. Auto Follow make sure each 5 seconds that you're following the selected target!
    -   Follow Key must be configured for Z key (default).
-   **Auto Mouse Click** - Enabling Auto Mouse Left Click using selected XY coordinates.
-   **Auto Target** - Use "TAB+{key}" as a key to start auto target feature. !!! It is not accessible inside timeline, "key mode" only !!!

![How to auto target](https://i.imgur.com/t2I7D7M.png)

### Build Instructions

1. **Clone the repository**

    ```bash
    git clone https://github.com/YOUR_USERNAME/flyff-universe-helper.git
    cd flyff-universe-helper
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Build the extension**

    ```bash
    # For Chrome/Edge
    npm run build-chrome

    # For Firefox
    npm run build-firefox
    ```

### Browser Installation

#### Chrome/Edge

1. Open `chrome://extensions/`
2. Enable **Developer Mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `dist` folder from the project
5. Open Flyff Universe and refresh the page

#### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Navigate to `dist` folder and select `manifest.json`
4. Open Flyff Universe and refresh the page

## 📖 Usage

### Getting Started

1. **Open the Control Panel**: Look for the "Cheats" button in the top-left corner
2. **Click "Cheats"** to expand the configuration menu

### Configure Buffs

1. Click **Buffs** button
2. Click each buff input field and press your desired key
3. Set **Activation Key** (key to trigger all buffs at once)
4. Set **Warning Time** in seconds (e.g., 900 = 15 minutes)
5. Click **Save**
6. Enable **"enable buff warning"** toggle in main panel

### Configure Party Skills

1. Click **Party Skills** button
2. For each skill:
    - **Location Key**: Hotbar position (e.g., `Alt+1`)
    - **Pressed Key**: Trigger key (e.g., `Insert`)
3. Click **Save**

### Create Timeline Automation

1. Click **Add Timeline**
2. Set interval time in milliseconds (e.g., 1000 = 1 second)
3. Click **Key** to add key presses or **Click** for mouse clicks
4. Configure each action:
    - Key: Enter the key to press
    - Cast: Delay before next action (ms)
5. Toggle on to activate

### Create Key Automation

1. Click **Add Key**
2. Set the key to press
3. Set press count (how many times)
4. Set cast time (interval between presses in ms)
5. Toggle on to activate

### Save Configuration

1. Enter a name in **Config name** field
2. Click **Save**
3. Configuration includes all buffs, keys, timelines, and settings

### Load Configuration

1. Select configuration from dropdown
2. Click **Load**
3. All settings will be restored

## ⌨️ Keyboard Shortcuts

| Key           | Action                                        |
| ------------- | --------------------------------------------- |
| **`** (Grave) | Activate all configured buffs                 |
| **Alt**       | Detect and click nearest monster              |
| **Tab**       | Target monster + press Z + toggle automations |
| **Esc**       | Close open modal windows                      |

## 🎮 Advanced Features

### Monster Detection Customization

To detect different monsters:

1. Take a screenshot of the target monster
2. Crop to just the monster image
3. Save as PNG in `assets/` folder
4. Update path in `src/flyff.ts`

### Adjust Detection Settings

**Confidence Threshold** (default: 0.7 = 70%):

-   Lower = More detections, more false positives
-   Higher = Fewer false positives, might miss monsters

**Scan Interval** (default: 500ms):

-   Lower = Faster detection, more CPU usage
-   Higher = Slower detection, less CPU usage

## 🛠️ Development

### Project Structure

```
flyff-universe-helper/
├── src/
│   ├── flyff.ts              # Main application
│   ├── ui/
│   │   ├── html.ts           # UI components
│   │   └── svg.ts            # Icons
│   └── utils/
│       ├── imageDetection.ts # Monster detection
│       ├── inputs.ts         # Input handling
│       └── timer.ts          # Timing utilities
├── assets/                   # Detection templates
├── manifest/                 # Browser manifests
├── public/                   # Static files
├── webpack/                  # Build config
└── dist/                     # Built extension
```

### Build Commands

```bash
npm install              # Install dependencies
npm run build-chrome     # Build for Chrome
npm run build-firefox    # Build for Firefox
```

### Technologies

-   TypeScript
-   Webpack 5
-   Bootstrap 5
-   Draggabilly
-   HTML5 Canvas API

## 🐛 Known Issues

-   Monster detection optimized for Captain Samoset template
-   Custom monster templates require manual setup
-   Some keys may conflict with browser shortcuts
-   Extension must be manually loaded after browser restart (Firefox temporary add-on)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Disclaimer

**This bot is for educational purposes only.**

-   Use at your own risk
-   Automated gameplay may violate game Terms of Service
-   Developers are not responsible for any consequences
-   May result in account suspension or ban
-   Not endorsed by or affiliated with Flyff Universe

## 📞 Support

-   🐛 **Bug Reports**: [Open an issue](https://github.com/YOUR_USERNAME/flyff-universe-helper/issues)
-   💡 **Feature Requests**: [Open an issue](https://github.com/YOUR_USERNAME/flyff-universe-helper/issues)
-   📖 **Documentation**: See [MONSTER_DETECTION_GUIDE.md](MONSTER_DETECTION_GUIDE.md)

## 🙏 Acknowledgments

### 🌟 Special Thanks

**Huge shoutout to**

![Ariorh1337](https://i.imgur.com/f3cxrAL.png)

**for starting this amazing project!** This extension wouldn't exist without their initial vision and hard work. Thank you for creating such a powerful tool for the Flyff Universe community! 🎉

### Contributors & Inspiration

-   Original Flyff Universe game team
-   Open source community contributors
-   Template matching algorithm inspiration

---

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ for the Flyff Universe community

## 📋 Changelog

### v0.1.0 (Current Release)

-   ✨ Added customizable buff activation key
-   ✨ Added configurable buff warning time
-   ✨ Added enable/disable toggle for buff warnings
-   🐛 Fixed buff warning showing when app is disabled
-   🎨 Improved UI with better organization
-   📦 Removed external version check
-   🔧 Warning system only for characters with configured buffs
-   💾 Activation key and warning time now saved in configuration profiles
