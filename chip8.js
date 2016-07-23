var Chip8 = function() {
  // Display 64x32-pixel
  // +-----------------+
  // | (0,0)    (63,0) |
  // |                 |
  // | (0,31)  (63,31) |
  // +-----------------+
  this.displayWidth = 64;
  this.displayHeight = 32;
  this.display = new Array(this.displayWidth * this.displayHeight);

  this.step = null;
  this.running = null;
  this.renderer = null;

  // O Chip 8 endereça 4KB (4095 bytes)
  this.memory = new Array(0xFFF);

  // O Chip 8 possui 15 registradores gerais de 8 bits com status igual, são chamados V0, V1, ..., VE.
  this.v = new Array(16);

  // Registrador de endereçamento de memória
  this.i = null;

  // Pilha para armazenar os endereços de retorno
  this.stack = new Array(16);
  this.sp = null;

  this.delayTimer = null;
  this.soundTimer = null;

  this.keys = {};
  this.reset();
};

Chip8.prototype = {
  // Carregar programa na memória
  loadProgram: function(program) {
    for (var i = 0, len = program.length; i < len; i++) {
      // 0x200     => 512
      // 1 + 0x200 => 513
      // 2 + 0x200 => 514
      this.memory[i + 0x200] = program[i];
    }
  },

  setKey: function(key) {
    this.keys[key] = true;
  },

  unsetKey: function(key) {
    delete this.keys[key];
  },

  setRenderer: function(renderer) {
    this.renderer = renderer;
  },

  getDisplayWidth: function() {
    return this.displayWidth;
  },

  getDisplayHeight: function() {
    return this.displayHeight;
  },

  setPixel: function(x, y) {
    var width = this.getDisplayWidth;
    var height = this.getDisplayHeight;
    var location;

    // Se o pixel excede as dimensões
    // Colocar x entre 0...64
    if (x > width) {
      x -= width;
    }
    else if (x < 0) {
      x += width;
    }

    // Se o pixel excede as dimensões
    // Colocar y entre 0...32
    if (y > height) {
      y -= height;
    }
    else if (y < 0) {
      y += height;
    }

    location = x + (y * width);

    this.display[location] ^= 1;

    // ^ (Bitwise XOR) - OR-exclusivo
    return !this.display[location];
  }
};
