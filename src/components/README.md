# Gift Randomizer - Cấu trúc sau refactor

## Tổng quan
Đã refactor component GiftRandomizer thành nhiều file nhỏ hơn để dễ quản lý và bảo trì.

## Cấu trúc file

### 📁 Data Layer
- `src/data/giftData.js` - Chứa danh sách người tặng, người nhận và quà
- `src/data/wishTemplates.js` - Chứa template lời chúc (sử dụng placeholder {giver}, {recipient})

### 🎣 Hooks
- `src/hooks/useGiftRandomizer.js` - Custom hook chứa toàn bộ logic xử lý

### 🧩 Components
- `src/components/GiftRandomizer.jsx` - Component chính (đã thu gọn)
- `src/components/GiftInput.jsx` - Form nhập tên và button chọn quà
- `src/components/SpinningAnimation.jsx` - Animation khi đang chọn quà
- `src/components/GiftResult.jsx` - Hiển thị kết quả

### 🎨 Styles
- `src/components/GiftRandomizer.css` - Style chung và layout
- `src/components/GiftInput.css` - Style riêng cho form input
- `src/components/SpinningAnimation.css` - Style cho animation
- `src/components/GiftResult.css` - Style cho kết quả

### 🛠️ Utils
- `src/utils/giftUtils.js` - Utility functions (getRarityColor, getRarityText)

## Lợi ích của refactor

1. **Dễ bảo trì**: Mỗi component có trách nhiệm riêng biệt
2. **Tái sử dụng**: Các component có thể dùng lại ở nơi khác
3. **Dễ test**: Có thể test từng component riêng lẻ
4. **Dễ đọc**: Code ngắn gọn, logic rõ ràng
5. **Dễ mở rộng**: Thêm tính năng mới không ảnh hưởng component khác

## Cách sử dụng

```jsx
import GiftRandomizer from './components/GiftRandomizer';

function App() {
  return <GiftRandomizer />;
}
```

Component sẽ tự động import và sử dụng các dependency cần thiết.