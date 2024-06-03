
export const PngAnimation = (props) => {
    const {
        src,
        frame = 0,
        grid = [1, 1],
        direction = 'horizontal',
        imgWidth,
        imgHeight,
        scale = 1,
        className,
        offset = [0, 0],
    } = props;

    const position = [0, 0];

    let _frame = Math.round(frame);
    // console.log(frame, _frame, imgWidth)
    const x = Math.floor(_frame / grid[1]);
    const y = _frame % grid[1];
    position[0] = x * imgWidth;
    position[1] = y * imgHeight;

    const backgroundSize = imgWidth * grid[0] + 'px ' + imgHeight * grid[1] + 'px';


    // if (direction === 'horizontal') {
    //     position[0] = _frame * imgWidth;
    // } else {
    //     position[1] = _frame * imgHeight;
    // }

    return (
      <div className={className} style={{ backgroundImage: `url(${src})`, backgroundPosition: `${(position[0] + offset[0])}px ${(position[1] + offset[1])}px`, backgroundSize }}></div>
    );
}