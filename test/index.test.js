/* eslint-env mocha */
import html, {
  normalizeAttrs,
  tryFlatten,
  isPrimitive,
  isClass,
  isFunc,
  isObj,
  isSvg,
  SnabbdomComponent
} from '../lib'
import chai, { expect } from 'chai'
import assertarrays from 'chai-arrays'
import asserttype from 'chai-asserttype'

chai.use(assertarrays)
chai.use(asserttype)

describe(`tryFlatten()`, () => {
  it('should return unflattened if not provided an array (undefined)', () => {
    const toFlatten = undefined
    expect(tryFlatten(toFlatten)).to.equal(toFlatten)
  })

  it("should return unflattened if not provided an array ('string')", () => {
    const toFlatten = 'flattenMe'
    expect(tryFlatten(toFlatten)).to.equal(toFlatten)
  })

  it("should return unflattened if not provided an array ('object')", () => {
    const toFlatten = { flattenMe: true }
    expect(tryFlatten(toFlatten)).to.equal(toFlatten)
  })

  it('should return flattened if provided an array', () => {
    const toFlatten = [
      'child',
      ['child', ['child'], ['child', 'child'], 'child'],
      ['child', ['child', 'child'], 'child'],
      'child',
      [
        'child',
        [
          'child',
          [
            'child',
            ['child', ['child'], ['child', 'child'], 'child'],
            [
              'child',
              [
                'child',
                'child',
                [
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child'],
                  ['child', ['child', 'child'], 'child'],
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child'],
                  [
                    'child',
                    ['child', 'child'],
                    'child',
                    [
                      'child',
                      ['child', ['child'], ['child', 'child'], 'child'],
                      ['child', ['child', 'child'], 'child'],
                      'child',
                      ['child', ['child'], ['child', 'child'], 'child'],
                      ['child', ['child', 'child'], 'child'],
                      ['child', ['child'], ['child', 'child'], 'child'],
                      ['child', ['child', 'child'], 'child'],
                      'child',
                      ['child', ['child'], ['child', 'child'], 'child']
                    ]
                  ],
                  [
                    'child',
                    ['child'],
                    [
                      'child',
                      'child',
                      [
                        'child',
                        ['child', ['child'], ['child', 'child'], 'child'],
                        ['child', ['child', 'child'], 'child'],
                        'child',
                        ['child', ['child'], ['child', 'child'], 'child'],
                        ['child', ['child', 'child'], 'child'],
                        ['child', ['child'], ['child', 'child'], 'child'],
                        ['child', ['child', 'child'], 'child'],
                        'child',
                        ['child', ['child'], ['child', 'child'], 'child']
                      ]
                    ],
                    'child'
                  ],
                  ['child', ['child', 'child'], 'child'],
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child']
                ]
              ],
              'child'
            ],
            'child',
            ['child', ['child'], ['child', 'child'], 'child'],
            ['child', ['child', 'child'], 'child'],
            [
              'child',
              [
                'child',
                [
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child'],
                  ['child', ['child', 'child'], 'child'],
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child'],
                  ['child', ['child', 'child'], 'child'],
                  ['child', ['child'], ['child', 'child'], 'child'],
                  ['child', ['child', 'child'], 'child'],
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child']
                ]
              ],
              ['child', 'child'],
              'child'
            ],
            [
              'child',
              [
                'child',
                'child',
                [
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child'],
                  ['child', ['child', 'child'], 'child'],
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child'],
                  ['child', ['child', 'child'], 'child'],
                  ['child', ['child'], ['child', 'child'], 'child'],
                  ['child', ['child', 'child'], 'child'],
                  'child',
                  ['child', ['child'], ['child', 'child'], 'child']
                ]
              ],
              'child'
            ],
            'child',
            ['child', ['child'], ['child', 'child'], 'child']
          ]
        ],
        ['child', 'child'],
        'child'
      ],
      ['child', ['child', 'child'], 'child'],
      ['child', ['child'], ['child', 'child'], 'child'],
      ['child', ['child', 'child'], 'child'],
      'child',
      ['child', ['child'], ['child', 'child'], 'child']
    ]
    const flattened = []
    for (let i = 0; i < 245; i++) {
      flattened.push('child')
    }
    expect(tryFlatten(toFlatten)).to.be.equalTo(flattened)
  })
})

describe(`isPrimitive()`, () => {
  it("should return true for 'string'", () => {
    expect(isPrimitive('string')).to.equal(true)
  })

  it("should return true for 'number'", () => {
    expect(isPrimitive(0)).to.equal(true)
  })

  it("should return true for 'boolean'", () => {
    expect(isPrimitive(true)).to.equal(true)
  })

  it("should return true for 'symbol'", () => {
    expect(isPrimitive(Symbol('string'))).to.equal(true)
  })

  it('should return true for null', () => {
    expect(isPrimitive(null)).to.equal(true)
  })

  it('should return true for undefined', () => {
    expect(isPrimitive(undefined)).to.equal(true)
  })

  it("should return false for 'object'", () => {
    expect(isPrimitive({})).to.equal(false)
  })

  it("should return false for 'function'", () => {
    expect(isPrimitive(function fn () {})).to.equal(false)
  })
})

describe(`isClass()`, () => {
  it("should return 'true' if 'class'", () => {
    const Component = class Component extends SnabbdomComponent {
      render () {}
    }
    expect(isClass(Component)).to.equal(true)
    expect(isClass('class')).to.equal(false)
  })
})

describe(`isFunc()`, () => {
  it("should return 'true' if 'function'", () => {
    const func = function () {}
    expect(isFunc(func)).to.equal(true)
    expect(isFunc('function')).to.equal(false)
  })
})

describe(`isObj()`, () => {
  it("should return 'true' if 'object'", () => {
    const obj = {}
    expect(isObj(obj)).to.equal(true)
    expect(isObj('object')).to.equal(false)
  })
})

describe(`isSvg()`, () => {
  it("should return 'true' if 'svg'", () => {
    const svg = 'svg#pic1'
    const notSvg = 'svgPic1'
    expect(isSvg(svg)).to.equal(true)
    expect(isSvg(notSvg)).to.equal(false)
  })
})

describe(`normalizeAttrs()`, () => {
  it('should normalize attributes', () => {
    const fn = function () {}
    const toNormalize = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'not_included',
      classNames: ['not_included'],
      id: 'not_included'
    }
    const normalized = normalizeAttrs(toNormalize)
    const expected = {
      hook: { insert: fn, destroy: fn },
      on: { change: fn, click: fn },
      style: { 'margin-top': '50px', 'margin-bottom': '50px' },
      class: { red: true, blue: true },
      props: {
        myProps: 'first',
        myPropsNext: 'next',
        myAttrProps: { second: fn }
      },
      attrs: { first: 1, second: 2 },
      dataset: { first: 1, second: 2 },
      myAttrNS: {
        first: fn,
        second: fn
      }
    }

    expect(normalized).to.deep.equal(expected)
  })
})

describe(`html()`, () => {
  it("should throw when provided invalid 'tag'", () => {
    expect(() => html()).to.throw(Error)
  })

  it("should build when provided 'string' as 'tag'", () => {
    expect(() => html('div', null, null)).to.not.throw()
  })

  it("should build when provided 'function' as 'tag'", () => {
    const Component = function () {}
    expect(() => html(Component, null, null)).to.not.throw()
  })

  it("should build when provided an 'object' with render 'function' as 'tag'", () => {
    const Component = { render: function () {} }
    expect(() => html(Component, null, null)).to.not.throw()
  })

  it("should throw when provided invalid 'class'", () => {
    const Component = class Component extends SnabbdomComponent {}
    expect(() => html(Component, null, null)).to.throw(Error)
  })

  it("should build when provided a 'class' with render 'function' as 'tag'", () => {
    const Component = class Component extends SnabbdomComponent {
      render () {}
    }
    expect(() => html(Component, null, null)).to.not.throw()
  })

  it("should build when provided 'tag', 'attrs' and 'children' (no child)", () => {
    const fn = function () {}
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: 'class2 class3',
      id: 'id.class1'
    }
    const vnode = <div {...attrs} />

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children).to.equalTo([])
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))
  })

  it("should build when provided 'tag', 'attrs' and 'children' (text child)", () => {
    const fn = function () {}
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const child = 'Hello, World!'
    const vnode = <div {...attrs}>{child}</div>

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children[0]).to.deep.equal({ text: 'Hello, World!' })
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))
  })

  it("should build when provided 'tag', 'attrs' and 'children' (vnode child)", () => {
    const fn = function () {}
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const child = <div>Hello, World!</div>
    const vnode = <div {...attrs}>{child}</div>
    const vnodeChild = vnode.children[0]

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children[0]).to.deep.equal(child)
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))

    expect(vnodeChild.key).to.equal(undefined)
    expect(vnodeChild.sel).to.equal('div')
    expect(vnodeChild.children[0]).to.deep.equal({ text: 'Hello, World!' })
    expect(vnodeChild.data).to.deep.equal({})
  })

  it("should build when provided 'tag', 'attrs' and 'children' ('tag' component with no child)", () => {
    const fn = function () {}
    const Component = (props, children) => <div {...props}>{children}</div>
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const vnode = <Component {...attrs} />

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children).to.equalTo([])
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))
  })

  it("should build when provided 'tag', 'attrs' and 'children' ('tag' component with text child)", () => {
    const fn = function () {}
    const Component = (props, children) => <div {...props}>{children}</div>
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const child = 'Hello, World!'
    const vnode = <Component {...attrs}>{child}</Component>

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children[0]).to.deep.equal({ text: 'Hello, World!' })
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))
  })

  it("should build when provided 'tag', 'attrs' and 'children' ('tag' component with vnode child)", () => {
    const fn = function () {}
    const Component = (props, children) => <div {...props}>{children}</div>
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const child = <div>Hello, World!</div>
    const vnode = <Component {...attrs}>{child}</Component>
    const vnodeChild = vnode.children[0]

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children[0]).to.deep.equal(child)
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))

    expect(vnodeChild.key).to.equal(undefined)
    expect(vnodeChild.sel).to.equal('div')
    expect(vnodeChild.children[0]).to.deep.equal({ text: 'Hello, World!' })
    expect(vnodeChild.data).to.deep.equal({})
  })

  it("should build when provided 'tag', 'attrs' and 'children' ('tag' class with no child)", () => {
    const fn = function () {}
    const Component = class Component extends SnabbdomComponent {
      render () {
        return <div {...this.props}>{this.children}</div>
      }
    }
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const vnode = <Component {...attrs} />

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children).to.equalTo([])
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))
  })

  it("should build when provided 'tag', 'attrs' and 'children' ('tag' class with text child)", () => {
    const fn = function () {}
    const Component = class Component extends SnabbdomComponent {
      render () {
        return <div {...this.props}>{this.children}</div>
      }
    }
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const child = 'Hello, World!'
    const vnode = <Component {...attrs}>{child}</Component>

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children[0]).to.deep.equal({ text: 'Hello, World!' })
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))
  })

  it("should build when provided 'tag', 'attrs' and 'children' ('tag' class with vnode child )", () => {
    const fn = function () {}
    const Component = class Component extends SnabbdomComponent {
      render () {
        return <div {...this.props}>{this.children}</div>
      }
    }
    const attrs = {
      hook: { insert: fn },
      'hook-destroy': fn,
      on: { change: fn },
      'on-click': fn,
      style: { 'margin-top': '50px' },
      'style-margin-bottom': '50px',
      class: { red: true },
      'class-blue': true,
      props: { myProps: 'first' },
      'props-myPropsNext': 'next',
      attrs: { first: 1 },
      'attrs-second': 2,
      dataset: { first: 1 },
      'dataset-second': 2,
      myAttrProps: { second: fn },
      'myAttrNS-first': fn,
      'myAttrNS-second': fn,
      key: 'key',
      classNames: ['class2', 'class3'],
      id: 'id.class1'
    }
    const child = <div>Hello, World!</div>
    const vnode = <Component {...attrs}>{child}</Component>
    const vnodeChild = vnode.children[0]

    expect(vnode.key).to.equal('key')
    expect(vnode.sel).to.equal('div#id.class1.class2.class3')
    expect(vnode.children[0]).to.deep.equal(child)
    expect(vnode.data).to.deep.equal(normalizeAttrs(attrs))

    expect(vnodeChild.key).to.equal(undefined)
    expect(vnodeChild.sel).to.equal('div')
    expect(vnodeChild.children[0]).to.deep.equal({ text: 'Hello, World!' })
    expect(vnodeChild.data).to.deep.equal({})
  })

  it("should build when provided 'tag', 'attrs' and 'children' ('tag' is 'svg')", () => {
    const childAttrs = {
      fill: 'none',
      stroke: 'white',
      d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
    }
    const child = <path classNames='pathClass' {...childAttrs} />

    const vnodeAttrs = { viewBox: '0 0 24 24' }
    const vnode = (
      <svg id='svg.svg' classNames='svgClass' {...vnodeAttrs}>
        {child}
      </svg>
    )
    const vnodeChild = vnode.children[0]

    expect(vnode.key).to.equal(undefined)
    expect(vnode.sel).to.equal('svg#svg.svg.svgClass')
    expect(vnode.children[0]).to.deep.equal(child)
    expect(vnode.data).to.deep.equal({
      attrs: {
        viewBox: '0 0 24 24'
      },
      ns: 'http://www.w3.org/2000/svg'
    })

    expect(vnodeChild.key).to.equal(undefined)
    expect(vnodeChild.sel).to.equal('path.pathClass')
    expect(vnodeChild.children).to.equalTo([])
    expect(vnodeChild.data).to.deep.equal({
      attrs: {
        fill: 'none',
        stroke: 'white',
        d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
      },
      ns: 'http://www.w3.org/2000/svg'
    })
  })
})
