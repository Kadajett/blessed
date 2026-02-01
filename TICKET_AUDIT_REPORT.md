# Beads Ticket Audit Report

## Summary

- **Total Issues:** 193
- **Epics:** 19
- **Potential Duplicates:** 3
- **Missing Blockers:** 35+ relationships
- **Missing Functionality:** 25+ features need tickets

---

## Part 1: Potential Duplicates

### 1. `blessed-edo` duplicates `blessed-19j.*` tasks
- `blessed-edo`: "Project setup: TypeScript, bitecs, Zod, Biome, Vitest"
- `blessed-19j.1` through `blessed-19j.7` cover the exact same items individually

**Recommendation:** Close `blessed-edo` as duplicate - it's already broken down into subtasks.

### 2. `blessed-bjw.3` and `blessed-bjw.13` overlap
- `blessed-bjw.3`: "Create tag parsing system"
- `blessed-bjw.13`: "Create nested tag parsing"

**Recommendation:** Keep both - .3 is the basic system, .13 is specifically for nested tags like `{bold}{red-fg}text{/red-fg}{/bold}`. Add .3 as blocker for .13.

### 3. `blessed-ree.7` and `blessed-ree.22` overlap
- `blessed-ree.7`: "Create focus management system"
- `blessed-ree.22`: "Create focus stack management"

**Recommendation:** Keep both - .7 is basic focus tracking, .22 is the modal/overlay stack. Add .7 as blocker for .22.

---

## Part 2: Missing Blocker Relationships

### Critical Foundation Chain

```
blessed-19j (Infrastructure)
  └─> blocks ALL other epics

blessed-0t8 (ECS Core)
  └─> blocks blessed-ree, blessed-bjw, blessed-wlg, blessed-i7e,
      blessed-b5i, blessed-294, blessed-zrt, blessed-c6n

blessed-mtg (Terminal I/O)
  └─> blocks blessed-ree, blessed-n37

blessed-hyf (Terminfo)
  └─> blocks blessed-mtg.4 (Program class needs terminfo)
```

### Specific Missing Dependencies

| Blocker | Blocked By | Reason |
|---------|-----------|--------|
| blessed-19j.1-7 | ALL other tasks | Infrastructure must exist first |
| blessed-0t8.1 (Position) | blessed-ree.3, blessed-bjw.9 | Components need Position defined |
| blessed-0t8.2 (Dimensions) | blessed-ree.3, blessed-bjw.17 | Need Dimensions for size calc |
| blessed-0t8.3 (Renderable) | blessed-ree.5 | Render system needs Renderable |
| blessed-0t8.4 (Hierarchy) | blessed-bjw.1, blessed-ree.4 | Layout needs parent-child |
| blessed-0t8.12 (Scheduler) | blessed-hla.1 | Game loop uses scheduler |
| blessed-vdk.1-3 | blessed-ree.5 | Rendering needs color system |
| blessed-etz.1-3 | blessed-ree.5, blessed-bjw.2 | Unicode width for rendering |
| blessed-mtg.1 (ANSI codes) | blessed-mtg.2-7 | All output uses ANSI codes |
| blessed-mtg.4 (Program) | blessed-ree.3 | Screen needs Program |
| blessed-ree.1 (Cell) | blessed-ree.2 | Double buffer needs Cell |
| blessed-ree.2 (Double buffer) | blessed-ree.5, blessed-ree.6 | Render needs buffers |
| blessed-ree.3 (Screen entity) | blessed-ree.4-8 | Layout/render need Screen |
| blessed-ree.4 (Layout) | blessed-wlg.*, blessed-bjw.9 | Widgets need layout |
| blessed-ree.5 (Render) | ALL widgets | Widgets render to screen |
| blessed-n37.1 (Key parser) | blessed-n37.3, blessed-n37.5 | Input system needs parser |
| blessed-n37.2 (Mouse parser) | blessed-n37.3, blessed-n37.5 | Input system needs parser |
| blessed-hla.1 (Game loop) | blessed-hla.2-6 | Loop features need base loop |
| blessed-2qm.1 (EventEmitter) | blessed-2qm.2-5 | Events need emitter |
| blessed-2qm.3 (State machine) | blessed-2qm.4-6 | SM system needs framework |
| blessed-wlg.1 (Box) | blessed-wlg.2-7, blessed-b5i.*, blessed-i7e.* | Most widgets extend Box |
| blessed-bjw.1 (Box render) | blessed-wlg.1 | Box widget needs renderer |
| blessed-bjw.3 (Tag parsing) | blessed-bjw.13 | Nested tags need base parser |
| blessed-ree.7 (Focus mgmt) | blessed-ree.22 | Focus stack needs base focus |
| blessed-b5i.1 (Form) | blessed-b5i.2-10 | Form inputs go in Form |
| blessed-i7e.1 (List component) | blessed-i7e.2 | List widget needs component |
| blessed-i7e.3 (Table component) | blessed-i7e.4-5 | Table widgets need component |

---

## Part 3: Missing Functionality (Need New Tickets)

Based on comprehensive audit of the original blessed library:

### HIGH PRIORITY - Core Features

#### 1. Terminal Emulator Widget (NEW EPIC?)
- Embeds a terminal emulator inside the blessed application
- Integrates with `term.js` for terminal emulation
- Integrates with `pty.js` for pseudo-terminal spawning
- **Original:** `lib/widgets/terminal.js`

#### 2. tmux Pass-through Support
- Wrapping escape sequences in DCS passthrough
- tmux version detection
- Handling tmux's terminal capabilities
- **Add to:** blessed-mtg epic

#### 3. Terminal Response Parsing
- Device Attributes (DA, Primary/Secondary)
- Device Status Reports (DSR) - cursor position, printer status
- Window manipulation responses
- **Add to:** blessed-mtg epic

#### 4. Character Set/Charset Handling
- G0-G3 character set designation
- DEC Special Graphics character set (line drawing)
- `smacs`/`rmacs` for alternate character set mode
- **Add to:** blessed-mtg epic

#### 5. Clipboard Integration
- `copyToClipboard()` for iTerm2
- OSC 52 for clipboard data
- **Note:** blessed-mtg.9 mentions this, may need expansion

#### 6. Cursor Customization
- Cursor shape (block, underline, line/bar)
- Cursor blink on/off
- Cursor color (OSC 12)
- **Note:** blessed-mtg.8 exists but may need expansion

#### 7. External Editor Integration
- `readEditor()` method to spawn external editor ($EDITOR)
- Returns edited content
- **Add to:** blessed-ree or new utility epic

#### 8. Spawn/Exec for External Processes
- `spawn()` and `exec()` methods for running external programs
- Handles terminal state save/restore
- **Note:** blessed-mtg.13 exists for this

### MEDIUM PRIORITY - UX Features

#### 9. Video Player Widget
- Plays video using mplayer/mpv with caca output
- Auto-detects mplayer vs mpv
- **Add to:** blessed-j3b (Image & Media) or blessed-zrt

#### 10. Overlay Image (w3m-based)
- Displays actual images overlaid on terminal using w3mimgdisplay
- Pixel-precise positioning
- **Note:** blessed-j3b mentions W3M but may need explicit ticket

#### 11. Tag Parsing/Generation System (Explicit)
- `{bold}text{/bold}`, `{red-fg}text{/red-fg}` markup
- `parseTags()`, `generateTags()`, `stripTags()`
- **Note:** blessed-bjw.3 exists but description may be incomplete

#### 12. Debug Log Widget (Built-in)
- Toggle with F12
- Draggable, scrollable debug panel
- Vi-keys support
- **Note:** blessed-hmk.5 mentions debug overlay

#### 13. Screenshot Functionality
- `screenshot()` method to capture screen content as text/ANSI
- **Add to:** blessed-ree epic

#### 14. Scroll Region Optimization (CSR)
- Hardware scroll region support via `csr`/`decstbm`
- `insertLine`, `deleteLine` for optimized scrolling
- **Note:** blessed-ree.11 exists for this

#### 15. Border Docking System
- `dockBorders` option for intelligent border merging
- Calculates proper line-drawing characters at borders
- **Note:** blessed-ree.14 exists for this

### LOWER PRIORITY - Specialized

#### 16. SIGTSTP (Ctrl+Z) Handling
- Proper terminal suspend/resume
- `sigtstp()` and `pause()`/`resume()` methods
- **Note:** blessed-mtg.14 exists for this

#### 17. Lock/Grab Keys System
- `lockKeys` - prevent all key events
- `grabKeys` - exclusive key handling
- `ignoreLocked` - keys that bypass lock
- **Note:** blessed-n37.9 exists for this

#### 18. Draggable Elements
- `options.draggable` flag on elements
- **Note:** blessed-bjw.6 mentions drag and drop

#### 19. Hover Effects System
- `hoverEffects` and `focusEffects` options
- Style changes on hover/focus
- **Note:** blessed-bjw.8 exists for this

#### 20. Shadow Effects
- `shadow` option for drop shadows on elements
- **Note:** blessed-bjw.14 exists for this

---

## Part 4: Tickets That Need Description Updates

Several tickets exist but may need expanded descriptions:

| Ticket | Current | Should Include |
|--------|---------|----------------|
| blessed-mtg.9 | "title and clipboard functions" | OSC 52, iTerm2 clipboard |
| blessed-mtg.8 | "cursor style functions" | Shape, color, blink |
| blessed-bjw.3 | "tag parsing system" | parseTags, generateTags, stripTags, escape sequences |
| blessed-j3b epic | mentions W3M | Add explicit w3mimgdisplay ticket |

---

## Part 5: Recommended Actions

### Immediate (Before Starting Work)

1. **Close blessed-edo** as duplicate of blessed-19j.* tasks
2. **Add blocker relationships** for the critical foundation chain:
   ```bash
   # Infrastructure blocks ECS
   bd dep add blessed-0t8 blessed-19j
   # ECS blocks Screen/Rendering
   bd dep add blessed-ree blessed-0t8
   # Terminal I/O blocks Screen
   bd dep add blessed-ree blessed-mtg
   # etc.
   ```

### Short-term (Create New Tickets)

1. Create ticket: "Create tmux pass-through support" under blessed-mtg
2. Create ticket: "Create terminal response parser" under blessed-mtg
3. Create ticket: "Create character set (charset) handling" under blessed-mtg
4. Create ticket: "Create screenshot capture method" under blessed-ree
5. Create ticket: "Create external editor integration" under blessed-ree or blessed-hmk

### Consider for Future

1. Terminal emulator widget (may be out of scope for game library)
2. Video player widget (may be out of scope)
3. More extensive image overlay support

---

## Appendix: Dependency Graph (Simplified)

```
Infrastructure (19j)
    │
    ├──► ECS Core (0t8)
    │        │
    │        ├──► Screen/Rendering (ree)
    │        │        │
    │        │        └──► All Widgets
    │        │
    │        ├──► Element System (bjw)
    │        │
    │        └──► Game Features (c6n)
    │
    ├──► Terminal I/O (mtg)
    │        │
    │        └──► Screen/Rendering (ree)
    │
    ├──► Terminfo (hyf)
    │        │
    │        └──► Terminal I/O (mtg)
    │
    ├──► Colors (vdk)
    │        │
    │        └──► Screen/Rendering (ree)
    │
    ├──► Unicode (etz)
    │        │
    │        └──► Screen/Rendering (ree)
    │
    └──► Events (2qm)
             │
             └──► Input System (n37)
                      │
                      └──► Game Loop (hla)
```
