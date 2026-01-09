# 🔍 Debug de Overflow - Guia Rápido

## 🚨 Se ainda houver conteúdo cortado

### Método 1: Inspeção Visual no DevTools

1. **Abrir DevTools no Celular ou Modo Mobile**
   - Chrome Desktop: F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   - Chrome Mobile: Menu → Mais Ferramentas → DevTools

2. **Console JavaScript - Encontrar Elementos com Overflow**

Cole este código no console do navegador:

```javascript
// Detectar elementos causando overflow horizontal
function findOverflowElements() {
  const elements = document.querySelectorAll('*');
  const overflowing = [];
  
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Verificar se o elemento ultrapassa os limites
    if (rect.right > viewportWidth || rect.left < 0) {
      overflowing.push({
        element: el,
        tag: el.tagName,
        classes: el.className,
        width: rect.width,
        right: rect.right,
        left: rect.left,
        overflow: rect.right - viewportWidth
      });
    }
  });
  
  // Ordenar por overflow (pior primeiro)
  overflowing.sort((a, b) => b.overflow - a.overflow);
  
  console.log('🔍 ELEMENTOS COM OVERFLOW:', overflowing);
  
  // Highlight dos elementos problemáticos
  overflowing.forEach(item => {
    item.element.style.outline = '3px solid red';
  });
  
  return overflowing;
}

// Executar
findOverflowElements();
```

### Método 2: CSS de Debug

**Adicione temporariamente ao `src/index.css`:**

```css
/* DEBUG: Adicionar TEMPORARIAMENTE para visualizar */
* {
  outline: 1px solid rgba(255, 0, 0, 0.1) !important;
}

*:hover {
  outline: 2px solid red !important;
}
```

**REMOVER após identificar o problema!**

---

## 📱 Checklist de Verificação Mobile

### Seção Diferenciais - WhyChooseUs

#### Tela 320px (iPhone SE pequeno):
- [ ] Título "Por que escolher o PH?" visível completamente
- [ ] Subtitle não cortada
- [ ] Cada card visível por inteiro
- [ ] Textos dentro dos limites
- [ ] Ícones não tocam a borda
- [ ] Nenhum scroll horizontal

#### Tela 375px (iPhone 12/13):
- [ ] Mesmas verificações acima
- [ ] Cards não tocam as laterais
- [ ] Gap entre cards adequado

#### Tela 390px - 430px (iPhone 14):
- [ ] Layout confortável
- [ ] Espaçamentos adequados

---

## 🛠️ Correções Aplicadas (v1.1.2)

### 1. **CSS Global Mais Rigoroso**
```css
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

* {
  max-width: 100%;
  word-wrap: break-word;
}

h1, h2, h3, h4, h5, h6, p {
  overflow-wrap: break-word;
  hyphens: auto;
}
```

### 2. **Section Container com Safe Areas**
```css
.section-container {
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
  overflow-x: hidden;
  box-sizing: border-box;
}
```

### 3. **Cards Mobile Ultra-Compactos**
```tsx
// WhyChooseUs.tsx - Mobile
<div className="px-2 sm:px-0"> {/* Padding extra */}
  <div className="w-full overflow-hidden rounded-lg"> {/* w-full */}
    <div className="flex gap-2.5 p-3"> {/* Reduzido */}
      <div className="w-10 h-10"> {/* Ícone menor */}
        {/* Icon */}
      </div>
      <div className="flex-1 min-w-0 pr-1"> {/* pr-1 adicional */}
        <h3 className="text-sm break-words hyphens-auto">
          {title}
        </h3>
        <p className="text-xs break-words hyphens-auto">
          {description}
        </p>
      </div>
    </div>
  </div>
</div>
```

### 4. **Index.tsx com Max-Width**
```tsx
<div className="max-w-[100vw] overflow-x-hidden">
  <main className="max-w-[100vw] overflow-x-hidden">
    {/* Componentes */}
  </main>
</div>
```

---

## 🎯 Elementos Potencialmente Problemáticos

### Verifique se algum destes está causando overflow:

1. **Títulos Longos**
   - ✅ Agora com `break-words` e `hyphens: auto`

2. **Cards com Padding Grande**
   - ✅ Reduzido para `p-3` no mobile

3. **Ícones Grandes**
   - ✅ Reduzido para `w-10 h-10` no mobile

4. **Margins Laterais**
   - ✅ Container com `px-2` extra

5. **Bordas e Borders**
   - ✅ Border-width incluído no `box-sizing: border-box`

---

## 📊 Tamanhos Atuais (Mobile < 768px)

| Elemento | Tamanho | Antes | Depois |
|----------|---------|-------|--------|
| Ícone | `w-10 h-10` | 56px | **40px** ✅ |
| Padding Card | `p-3` | 20px | **12px** ✅ |
| Gap | `gap-2.5` | 12px | **10px** ✅ |
| Título | `text-sm` | 16px | **14px** ✅ |
| Descrição | `text-xs` | 14px | **12px** ✅ |

---

## 🔧 Debug Avançado

### Script para Medir Widths

```javascript
// Cole no console
document.querySelectorAll('#diferenciais *').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.width > window.innerWidth) {
    console.log('🚨 LARGURA EXCESSIVA:', {
      element: el,
      width: rect.width,
      viewport: window.innerWidth,
      overflow: rect.width - window.innerWidth,
      classes: el.className
    });
  }
});
```

### Verificar Computed Styles

```javascript
// Verificar padding/margin real
const card = document.querySelector('#diferenciais > div > div > div:first-child');
const styles = window.getComputedStyle(card);
console.log({
  width: styles.width,
  maxWidth: styles.maxWidth,
  padding: styles.padding,
  margin: styles.margin,
  boxSizing: styles.boxSizing
});
```

---

## ✅ Teste Final

### No Celular Real:
1. Abrir site
2. Ir para seção "Diferenciais"
3. Tentar fazer scroll horizontal
4. **Não deve haver scroll horizontal** ✅

### No Chrome DevTools:
1. F12 → Device Toolbar
2. iPhone SE (320px)
3. Recarregar página
4. Verificar seção Diferenciais
5. **Nada cortado** ✅

---

## 📞 Reportar Problema

Se ainda houver overflow após todas essas correções:

1. Cole o resultado do script de debug
2. Informe qual dispositivo/largura
3. Screenshot da seção problemática
4. Qual elemento específico está cortado

---

**Última atualização**: v1.1.2 - Correções ultra-rigorosas aplicadas  
**Status**: Todas as medidas de segurança implementadas ✅

