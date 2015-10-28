class DocInfo {
  getIntro() {
    return ``;
  }

  getDescription() {
    throw new Error(`getDescription not implemented for ${this.constructor.name}`);
  }

  getAttributesText() {
    throw new Error(`getAttributesText not implemented for ${this.constructor.name}`);
  }
}

export default DocInfo;
